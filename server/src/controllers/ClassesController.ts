import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
	week_day: number;
	from: string;
	to: string;
}

export default class ClassController {
	async list(request: Request, response: Response) {
		const filters = request.query;

		const subject = filters.subject as string;
		const week_day = filters.week_day as string;
		const time = filters.time as string;

		if (!filters.week_day || !filters.subject || !filters.time) {
			return response.status(400).json({
				error: "Missing filters"
			});
		}

		const timeMinutes = convertHourToMinutes(filters.time as string);

		console.log(timeMinutes);

		const classes = await db('classes')
		.whereExists(function() {
			this.select('class_schedule.*')
			.from('class_schedule')
			.whereRaw('`class_schedule`. `class_id` = `classes`.`id`')
			.whereRaw('`class_schedule`. `week_day` = ??', [Number(week_day)])
			.whereRaw('`class_schedule`. `from` <= ??', [timeMinutes])
			.whereRaw('`class_schedule`. `to` > ??', [timeMinutes])
		})
		.where('classes.subject', '=' ,filters.subject as string)
		.join('users', 'classes.user_id', '=', 'users.id')
		.select(['classes.*', 'users.*']);

		return response.json(classes);

	}

	async create(request: Request , response: Response) {
		const {
			name,
			avatar,
			whatsapp,
			bio,
			subject,
			cost,
			schedule
		} = request.body;
	
		const trx = await db.transaction();
	
		try { 
			const insertedUserIds = await trx('users').insert({
				name,
				avatar,
				whatsapp,
				bio
			})
		
			const user_id = insertedUserIds[0];
		
			const insertedClassesIds = await trx('classes').insert({
				subject,
				cost,
				user_id,
			})
		
			const class_id = insertedClassesIds[0];
		
			const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
				return {
					class_id,
					week_day: scheduleItem.week_day,
					from: convertHourToMinutes(scheduleItem.from),
					to: convertHourToMinutes(scheduleItem.to)
				}
			})
		
			await trx('class_schedule').insert(classSchedule);
		
			// INSERE TODAS OPERAÇÕES DE UMA VEZ NO BD
			await trx.commit();
		
			return response.status(201).send();
		} catch (err) {
			await trx.rollback();
			return response.status(400).json({
				error: 'Unexpected error occurred'
			})
		}
	
	
	}
}