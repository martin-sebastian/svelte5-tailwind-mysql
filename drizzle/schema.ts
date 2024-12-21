import {
	mysqlTable,
	mysqlSchema,
	AnyMySqlColumn,
	index,
	foreignKey,
	int,
	varchar,
	decimal,
	datetime,
	unique,
	mediumtext
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const accpack = mysqlTable(
	'accpack',
	{
		accpackid: int('accpackid').autoincrement().notNull(),
		packname: varchar('packname', { length: 100 }),
		packdesc: varchar('packdesc', { length: 255 }),
		packmodels: varchar('packmodels', { length: 255 }),
		packnotes: varchar('packnotes', { length: 500 }),
		msrp: decimal('msrp', { precision: 6, scale: 2 }).notNull(),
		invoice: decimal('invoice', { precision: 6, scale: 2 }).notNull(),
		saleprice: decimal('saleprice', { precision: 6, scale: 2 }).notNull(),
		unitmfg: varchar('unitmfg', { length: 45 }),
		labormsrp: decimal('labormsrp', { precision: 6, scale: 2 }).notNull(),
		laborinvoice: decimal('laborinvoice', { precision: 6, scale: 2 }).notNull(),
		laborsaleprice: decimal('laborsaleprice', { precision: 6, scale: 2 }).notNull(),
		salesnotes: varchar('salesnotes', { length: 1000 }),
		packbrand: varchar('packbrand', { length: 45 }),
		datecreated: datetime('datecreated', { mode: 'string' }).notNull(),
		datemodified: datetime('datemodified', { mode: 'string' }).notNull(),
		profitgross: decimal('profitgross', { precision: 6, scale: 2 }).notNull(),
		fitmentnotes: varchar('fitmentnotes', { length: 100 }),
		quotelevel: int('quotelevel').notNull(),
		internalpackname: varchar('internalpackname', { length: 100 }),
		internalpartnumber: varchar('internalpartnumber', { length: 45 }),
		modeltype: varchar('modeltype', { length: 45 }),
		laborhours: decimal('laborhours', { precision: 4, scale: 2 }).notNull(),
		fixedsaleprice: decimal('fixedsaleprice', { precision: 6, scale: 2 }).notNull(),
		accpackprogramid: int('accpackprogramid').references(() => accpackprogram.accpackprogramid),
		editstatus: int('editstatus').default(0).notNull(),
		salepricelastmodified: datetime('salepricelastmodified', { mode: 'string' }).notNull(),
		servicemgremail: int('servicemgremail')
	},
	(table) => {
		return {
			accpackprogram_fk_idx: index('accpack_accpackprogram_fk_idx').on(table.accpackprogramid)
		};
	}
);

export const accpackmu = mysqlTable(
	'accpackmu',
	{
		accpackmuid: int('accpackmuid').autoincrement().notNull(),
		muid: int('muid')
			.notNull()
			.references(() => mu.muid, { onDelete: 'cascade' }),
		accpackid: int('accpackid')
			.notNull()
			.references(() => accpack.accpackid, { onDelete: 'cascade' })
	},
	(table) => {
		return {
			muaccgroup_accgroup_fkid_idx: index('muaccgroup_accgroup_fkid_idx').on(table.accpackid),
			muaccgroup_mu_fkid_idx: index('muaccgroup_mu_fkid_idx').on(table.muid)
		};
	}
);

export const accpackpart = mysqlTable(
	'accpackpart',
	{
		accpackpartid: int('accpackpartid').autoincrement().notNull(),
		accpackid: int('accpackid')
			.notNull()
			.references(() => accpack.accpackid, { onDelete: 'cascade' }),
		partid: int('partid')
			.notNull()
			.references(() => part.partid),
		listnumber: int('listnumber').notNull(),
		quantity: decimal('quantity', { precision: 3, scale: 1 }).notNull(),
		laborhours: decimal('laborhours', { precision: 4, scale: 2 }).notNull()
	},
	(table) => {
		return {
			accgroupitem_accgroup_id_idx: index('accgroupitem_accgroup_id_idx').on(table.accpackid),
			accgroupitem_accitem_fkid_idx: index('accgroupitem_accitem_fkid_idx').on(table.partid)
		};
	}
);

export const accpackprogram = mysqlTable('accpackprogram', {
	accpackprogramid: int('accpackprogramid').autoincrement().notNull(),
	programname: varchar('programname', { length: 45 }),
	mfg: varchar('mfg', { length: 45 }),
	modeltype: varchar('modeltype', { length: 45 }),
	pricebase: int('pricebase').notNull(),
	pricemodifier: decimal('pricemodifier', { precision: 4, scale: 2 }).notNull(),
	expiredate: datetime('expiredate', { mode: 'string' })
});

export const brochureunit = mysqlTable(
	'brochureunit',
	{
		id: int('id').autoincrement().notNull(),
		sourcemuid: int('sourcemuid').notNull(),
		muid: int('muid')
			.notNull()
			.references(() => mu.muid, { onDelete: 'cascade' }),
		created: datetime('created', { mode: 'string' })
	},
	(table) => {
		return {
			mu_mubrochureunitid_idx: index('mu_mubrochureunitid_idx').on(table.muid)
		};
	}
);

export const commprogram = mysqlTable(
	'commprogram',
	{
		commprogramid: int('commprogramid').autoincrement().notNull(),
		muid: int('muid').notNull(),
		commprogramname: varchar('commprogramname', { length: 45 }),
		commprogramnotes: varchar('commprogramnotes', { length: 255 }),
		begindate: datetime('begindate', { mode: 'string' }),
		expiredate: datetime('expiredate', { mode: 'string' }),
		mfg: varchar('mfg', { length: 45 }),
		basecomm: decimal('basecomm', { precision: 7, scale: 2 }).notNull(),
		accessorycomm: decimal('accessorycomm', { precision: 7, scale: 2 }).notNull(),
		floorplancomm: decimal('floorplancomm', { precision: 7, scale: 2 }).notNull(),
		modeltype: varchar('modeltype', { length: 45 })
	},
	(table) => {
		return {
			commprogramid_UNIQUE: unique('commprogramid_UNIQUE').on(table.commprogramid)
		};
	}
);

export const commprogram2 = mysqlTable('commprogram2', {
	commprogram2id: int('commprogram2id').autoincrement().notNull(),
	commissionprogramname: varchar('commissionprogramname', { length: 45 }),
	mfg: varchar('mfg', { length: 45 }),
	modelyear: int('modelyear'),
	modeltype: varchar('modeltype', { length: 45 }),
	dsrpmin: decimal('dsrpmin', { precision: 7, scale: 2 }),
	baseamount: decimal('baseamount', { precision: 7, scale: 2 }).notNull(),
	floorplanamount: decimal('floorplanamount', { precision: 7, scale: 2 }).notNull(),
	accecorysoldamount: decimal('accecorysoldamount', { precision: 7, scale: 2 }).notNull(),
	demounitamount: decimal('demounitamount', { precision: 7, scale: 2 }).notNull(),
	stockedamount: decimal('stockedamount', { precision: 7, scale: 2 }).notNull(),
	datecreated: datetime('datecreated', { mode: 'string' }).notNull(),
	datemodified: datetime('datemodified', { mode: 'string' }).notNull(),
	grossprofitpercent: decimal('grossprofitpercent', { precision: 5, scale: 2 }).notNull(),
	discretionamount: decimal('discretionamount', { precision: 6, scale: 2 }).notNull()
});

export const contact = mysqlTable(
	'contact',
	{
		contactid: int('contactid').autoincrement().notNull(),
		firstname: varchar('firstname', { length: 45 }),
		lastname: varchar('lastname', { length: 45 }),
		phone: varchar('phone', { length: 45 }),
		email: varchar('email', { length: 255 }),
		contacttype: varchar('contacttype', { length: 45 }),
		info: varchar('info', { length: 1000 }),
		datecreated: datetime('datecreated', { mode: 'string' }).notNull(),
		ipaddress: varchar('ipaddress', { length: 45 }),
		country: varchar('country', { length: 45 }),
		region: varchar('region', { length: 45 }),
		city: varchar('city', { length: 100 })
	},
	(table) => {
		return {
			contactid_UNIQUE: unique('contactid_UNIQUE').on(table.contactid)
		};
	}
);

export const coupon = mysqlTable('coupon', {
	couponid: int('couponid').autoincrement().notNull(),
	couponname: varchar('couponname', { length: 45 }),
	couponnotes: varchar('couponnotes', { length: 255 }),
	mfg: varchar('mfg', { length: 45 }),
	modeltype: varchar('modeltype', { length: 45 }),
	couponad: varchar('couponad', { length: 255 }),
	picpath: varchar('picpath', { length: 255 }),
	expiredate: datetime('expiredate', { mode: 'string' }),
	coupontype: int('coupontype').notNull(),
	couponurl: varchar('couponurl', { length: 255 }),
	couponvalue: decimal('couponvalue', { precision: 6, scale: 2 }),
	couponcost: decimal('couponcost', { precision: 6, scale: 2 }),
	coupontext: varchar('coupontext', { length: 255 })
});

export const couponmu = mysqlTable(
	'couponmu',
	{
		couponmuid: int('couponmuid').autoincrement().notNull(),
		couponid: int('couponid')
			.notNull()
			.references(() => coupon.couponid),
		muid: int('muid')
			.notNull()
			.references(() => mu.muid, { onDelete: 'cascade' })
	},
	(table) => {
		return {
			coupon_fk_idx: index('couponmu_coupon_fk_idx').on(table.couponid),
			mu_fk_idx: index('couponmu_mu_fk_idx').on(table.muid)
		};
	}
);

export const cycletraderunit = mysqlTable(
	'cycletraderunit',
	{
		muid: int('muid')
			.notNull()
			.references(() => mu.muid),
		listingid: bigint('listingid', { mode: 'number' }).notNull(),
		listingurl: varchar('listingurl', { length: 255 }).notNull(),
		vin: varchar('vin', { length: 45 }).notNull(),
		stocknumber: varchar('stocknumber', { length: 45 }).notNull(),
		store: int('store').notNull(),
		type: varchar('type', { length: 255 }).notNull(),
		category: varchar('category', { length: 255 }).notNull(),
		year: int('year').notNull(),
		make: varchar('make', { length: 255 }),
		model: varchar('model', { length: 255 }),
		mileage: int('mileage').default(0),
		price: decimal('price', { precision: 8, scale: 2 }).default('0.00'),
		getbestprice: decimal('getbestprice', { precision: 8, scale: 2 }).default('0.00'),
		saleprice: decimal('saleprice', { precision: 8, scale: 2 }).default('0.00'),
		status: varchar('status', { length: 255 }),
		// Warning: Can't parse bit(1) from database
		// bit(1)Type: bit(1)("isfeatured"),
		// Warning: Can't parse bit(1) from database
		// bit(1)Type: bit(1)("ispremium"),
		imageurl: varchar('imageurl', { length: 255 }),
		source: varchar('source', { length: 255 })
	},
	(table) => {
		return {
			muid_UNIQUE: unique('muid_UNIQUE').on(table.muid)
		};
	}
);

export const cycletraderunits_bk = mysqlTable('cycletraderunits_bk', {
	muid: int('muid').notNull(),
	listingid: bigint('listingid', { mode: 'number' }).notNull(),
	listingurl: varchar('listingurl', { length: 255 }).notNull(),
	vin: varchar('vin', { length: 45 }).notNull(),
	stocknumber: varchar('stocknumber', { length: 45 }).notNull(),
	store: int('store').notNull(),
	type: varchar('type', { length: 255 }).notNull(),
	category: varchar('category', { length: 255 }).notNull(),
	year: int('year').notNull(),
	make: varchar('make', { length: 255 }),
	model: varchar('model', { length: 255 }),
	mileage: int('mileage').default(0),
	price: decimal('price', { precision: 8, scale: 2 }).default('0.00'),
	getbestprice: decimal('getbestprice', { precision: 8, scale: 2 }).default('0.00'),
	saleprice: decimal('saleprice', { precision: 8, scale: 2 }).default('0.00'),
	status: varchar('status', { length: 255 }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("isfeatured"),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("ispremium"),
	imageurl: varchar('imageurl', { length: 255 }),
	source: varchar('source', { length: 255 })
});

export const cycletraderunit_bk = mysqlTable('cycletraderunit_bk', {
	muid: int('muid').notNull(),
	listingid: bigint('listingid', { mode: 'number' }).notNull(),
	listingurl: varchar('listingurl', { length: 255 }).notNull(),
	vin: varchar('vin', { length: 45 }).notNull(),
	stocknumber: varchar('stocknumber', { length: 45 }).notNull(),
	store: int('store').notNull(),
	type: varchar('type', { length: 255 }).notNull(),
	category: varchar('category', { length: 255 }).notNull(),
	year: int('year').notNull(),
	make: varchar('make', { length: 255 }),
	model: varchar('model', { length: 255 }),
	mileage: int('mileage').default(0),
	price: decimal('price', { precision: 8, scale: 2 }).default('0.00'),
	getbestprice: decimal('getbestprice', { precision: 8, scale: 2 }).default('0.00'),
	saleprice: decimal('saleprice', { precision: 8, scale: 2 }).default('0.00'),
	status: varchar('status', { length: 255 }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("isfeatured"),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("ispremium"),
	imageurl: varchar('imageurl', { length: 255 }),
	source: varchar('source', { length: 255 })
});

export const financeapp = mysqlTable('financeapp', {
	financeappid: int('financeappid').autoincrement().notNull(),
	firstname: varchar('firstname', { length: 100 }),
	middlename: varchar('middlename', { length: 100 }),
	lastname: varchar('lastname', { length: 100 }),
	phonenumber: varchar('phonenumber', { length: 45 }),
	email: varchar('email', { length: 100 }),
	address1: varchar('address1', { length: 100 }),
	address2: varchar('address2', { length: 100 }),
	city: varchar('city', { length: 100 }),
	state: varchar('state', { length: 45 }),
	postalcode: varchar('postalcode', { length: 45 }),
	dateofbirth: datetime('dateofbirth', { mode: 'string' }).notNull(),
	ssn: varchar('ssn', { length: 45 }),
	bamstore: int('bamstore').notNull(),
	datecreated: datetime('datecreated', { mode: 'string' }).notNull(),
	occupation: varchar('occupation', { length: 100 }),
	vehicle: varchar('vehicle', { length: 100 }),
	muid: int('muid'),
	appstatus: int('appstatus').notNull(),
	newused: int('newused'),
	financeamount: decimal('financeamount', { precision: 5, scale: 0 }),
	modelmfg: varchar('modelmfg', { length: 45 }),
	modelyear: int('modelyear'),
	modelname: varchar('modelname', { length: 45 }),
	modelcode: varchar('modelcode', { length: 45 }),
	b50modeltype: varchar('b50modeltype', { length: 45 }),
	notesinternal: varchar('notesinternal', { length: 1000 }),
	scoreequifax: int('scoreequifax'),
	scoretransunion: int('scoretransunion')
});

export const job = mysqlTable(
	'job',
	{
		jobid: int('jobid').autoincrement().notNull(),
		jobdesc: varchar('jobdesc', { length: 1000 }),
		tiredisposetax: decimal('tiredisposetax', { precision: 7, scale: 2 }).notNull(),
		tiredisposefee: decimal('tiredisposefee', { precision: 7, scale: 2 }).notNull(),
		storagefee: decimal('storagefee', { precision: 7, scale: 2 }).notNull(),
		shopsuppliesfee: decimal('shopsuppliesfee', { precision: 7, scale: 2 }).notNull(),
		laborhoursbilled: decimal('laborhoursbilled', { precision: 4, scale: 2 }).notNull(),
		laborhourstype: int('laborhourstype').notNull(),
		jobtitle: varchar('jobtitle', { length: 100 }),
		jobwarning: varchar('jobwarning', { length: 45 }),
		intervalmiles: int('intervalmiles'),
		tools: varchar('tools', { length: 500 }),
		joblaborrateid: int('joblaborrateid')
			.notNull()
			.references(() => joblaborrate.joblaborrateid),
		datecreated: datetime('datecreated', { mode: 'string' }).notNull(),
		datemodified: datetime('datemodified', { mode: 'string' }).notNull(),
		laborprice: decimal('laborprice', { precision: 6, scale: 2 }).notNull(),
		partsprice: decimal('partsprice', { precision: 6, scale: 2 }).notNull(),
		jobprice: decimal('jobprice', { precision: 6, scale: 2 }).notNull(),
		jobcategoryid: int('jobcategoryid')
			.notNull()
			.references(() => jobcategory.jobcategoryid),
		mfgname: varchar('mfgname', { length: 45 }),
		technicalnotes: varchar('technicalnotes', { length: 2000 }),
		salesnotes: varchar('salesnotes', { length: 2000 }),
		laborhoursactual: decimal('laborhoursactual', { precision: 4, scale: 2 }),
		jobpricetype: int('jobpricetype').notNull(),
		feeprice: decimal('feeprice', { precision: 5, scale: 2 }).notNull(),
		majorunitfamilyid: int('majorunitfamilyid').references(() => majorunitfamily.majorunitfamilyid),
		modeltype: varchar('modeltype', { length: 45 }),
		laborcost: decimal('laborcost', { precision: 6, scale: 2 }),
		partscost: decimal('partscost', { precision: 6, scale: 2 }).notNull(),
		jobgrossprofit: decimal('jobgrossprofit', { precision: 6, scale: 2 }).notNull(),
		jobdisclaimer: varchar('jobdisclaimer', { length: 45 }),
		jobcaveat: varchar('jobcaveat', { length: 100 }),
		jobtype: int('jobtype').notNull(),
		jobstatus: int('jobstatus').notNull(),
		jobtitlemarketing: varchar('jobtitlemarketing', { length: 45 }),
		shopsuppliesfeerate: int('shopsuppliesfeerate').notNull(),
		jobcost: decimal('jobcost', { precision: 6, scale: 2 }).notNull(),
		jobsaleprogramid: int('jobsaleprogramid').references(() => jobsaleprogram.jobsaleprogramid),
		jobsaleprice: decimal('jobsaleprice', { precision: 6, scale: 2 }),
		jobsalepriceexpiredate: datetime('jobsalepriceexpiredate', { mode: 'string' }),
		intervalhours: int('intervalhours'),
		intervalmonths: int('intervalmonths'),
		laborhoursflatrate: decimal('laborhoursflatrate', { precision: 4, scale: 2 }),
		customernotice: varchar('customernotice', { length: 2000 }),
		marketingdisplaytype: int('marketingdisplaytype').notNull(),
		majorunitfamilytype: int('majorunitfamilytype').notNull()
	},
	(table) => {
		return {
			jobcategory_fk_idx: index('job_jobcategory_fk_idx').on(table.jobcategoryid),
			majorunitfamily_fk_idx: index('job_majorunitfamily_fk_idx').on(table.majorunitfamilyid),
			joblaborrate_fk_idx: index('job_joblaborrate_fk_idx').on(table.joblaborrateid),
			jobsaleprogram_fk_idx: index('job_jobsaleprogram_fk_idx').on(table.jobsaleprogramid)
		};
	}
);

export const jobaction = mysqlTable(
	'jobaction',
	{
		jobactionid: int('jobactionid').autoincrement().notNull(),
		actionname: varchar('actionname', { length: 100 }).notNull(),
		actiondetails: varchar('actiondetails', { length: 1000 }),
		laborhoursestimate: decimal('laborhoursestimate', { precision: 5, scale: 2 }),
		jobactioncategoryid: int('jobactioncategoryid')
			.notNull()
			.references(() => jobactioncategory.jobactioncategoryid)
	},
	(table) => {
		return {
			jobactioncategory_id_idx: index('jobaction_jobactioncategory_id_idx').on(
				table.jobactioncategoryid
			)
		};
	}
);

export const jobactioncategory = mysqlTable('jobactioncategory', {
	jobactioncategoryid: int('jobactioncategoryid').autoincrement().notNull(),
	categoryname: varchar('categoryname', { length: 45 }),
	wordstosubstitute: varchar('wordstosubstitute', { length: 45 }),
	listnumber: int('listnumber').notNull()
});

export const jobcategory = mysqlTable('jobcategory', {
	jobcategoryid: int('jobcategoryid').autoincrement().notNull(),
	categoryname: varchar('categoryname', { length: 45 }),
	categorynamemarketing: varchar('categorynamemarketing', { length: 100 }),
	listnumber: int('listnumber').notNull()
});

export const jobjobaction = mysqlTable(
	'jobjobaction',
	{
		jobjobactionid: int('jobjobactionid').autoincrement().notNull(),
		jobid: int('jobid')
			.notNull()
			.references(() => job.jobid),
		jobactionid: int('jobactionid')
			.notNull()
			.references(() => jobaction.jobactionid),
		laborhours: decimal('laborhours', { precision: 4, scale: 2 })
	},
	(table) => {
		return {
			job_fk_idx: index('jobjobaction_job_fk_idx').on(table.jobid),
			jobaction_fk_idx: index('jobjobaction_jobaction_fk_idx').on(table.jobactionid)
		};
	}
);

export const joblaborrate = mysqlTable('joblaborrate', {
	joblaborrateid: int('joblaborrateid').autoincrement().notNull(),
	mfg: varchar('mfg', { length: 45 }),
	modeltype: varchar('modeltype', { length: 45 }),
	hourrate: decimal('hourrate', { precision: 6, scale: 2 }).notNull(),
	ratepriority: int('ratepriority').default(0).notNull()
});

export const jobmajorunit = mysqlTable(
	'jobmajorunit',
	{
		jobmajorunitid: int('jobmajorunitid').autoincrement().notNull(),
		jobid: int('jobid')
			.notNull()
			.references(() => job.jobid),
		majorunitid: int('majorunitid')
			.notNull()
			.references(() => majorunit.majorunitid)
	},
	(table) => {
		return {
			job_jobmajorunit_fk_idx: index('job_jobmajorunit_fk_idx').on(table.jobid),
			majorunit_majorunit_fk_idx: index('majorunit_majorunit_fk_idx').on(table.majorunitid)
		};
	}
);

export const jobmajorunitfamily = mysqlTable(
	'jobmajorunitfamily',
	{
		jobmajorunitfamilyid: int('jobmajorunitfamilyid').autoincrement().notNull(),
		jobid: int('jobid')
			.notNull()
			.references(() => job.jobid),
		majorunitfamilyid: int('majorunitfamilyid')
			.notNull()
			.references(() => majorunitfamily.majorunitfamilyid)
	},
	(table) => {
		return {
			jobmufamily_job_idx: index('jobmufamily_job_idx').on(table.jobid),
			jobmufamily_mufamily_fk_idx: index('jobmufamily_mufamily_fk_idx').on(table.majorunitfamilyid)
		};
	}
);

export const jobpartgroup = mysqlTable(
	'jobpartgroup',
	{
		jobpartgroupid: int('jobpartgroupid').autoincrement().notNull(),
		jobid: int('jobid')
			.notNull()
			.references(() => job.jobid),
		groupname: varchar('groupname', { length: 45 }).notNull(),
		applicationnotes: varchar('applicationnotes', { length: 1000 }),
		partgroupprice: decimal('partgroupprice', { precision: 6, scale: 2 }).notNull(),
		grouptype: int('grouptype').notNull()
	},
	(table) => {
		return {
			jobactionpartgroup_jobaction_fk_idx: index('jobactionpartgroup_jobaction_fk_idx').on(
				table.jobid
			)
		};
	}
);

export const jobpartgrouppart = mysqlTable(
	'jobpartgrouppart',
	{
		jobpartgrouppartid: int('jobpartgrouppartid').autoincrement().notNull(),
		partid: int('partid')
			.notNull()
			.references(() => part.partid),
		quantity: int('quantity').notNull(),
		jobpartgroupid: int('jobpartgroupid')
			.notNull()
			.references(() => jobpartgroup.jobpartgroupid, { onDelete: 'cascade' }),
		applicationnotes: varchar('applicationnotes', { length: 255 })
	},
	(table) => {
		return {
			jobpart_part_fk_idx: index('jobpart_part_fk_idx').on(table.partid),
			jobactpgrouppart_jobactpgroup_fk_idx: index('jobactpgrouppart_jobactpgroup_fk_idx').on(
				table.jobpartgroupid
			)
		};
	}
);

export const jobperformancelog = mysqlTable(
	'jobperformancelog',
	{
		jobperformancelogid: int('jobperformancelogid').autoincrement().notNull(),
		jobid: int('jobid').references(() => job.jobid),
		techname: varchar('techname', { length: 45 }),
		jobdate: datetime('jobdate', { mode: 'string' }).notNull(),
		techclass: int('techclass').notNull(),
		laborhoursactual: decimal('laborhoursactual', { precision: 5, scale: 2 }).notNull(),
		joblocation: varchar('joblocation', { length: 45 })
	},
	(table) => {
		return {
			jobperformance_job_fk_idx: index('jobperformance_job_fk_idx').on(table.jobid)
		};
	}
);

export const jobsaleprogram = mysqlTable('jobsaleprogram', {
	jobsaleprogramid: int('jobsaleprogramid').autoincrement().notNull(),
	programname: varchar('programname', { length: 45 }),
	mfg: varchar('mfg', { length: 45 }),
	modeltype: varchar('modeltype', { length: 45 }),
	begindate: datetime('begindate', { mode: 'string' }).notNull(),
	expiredate: datetime('expiredate', { mode: 'string' }).notNull(),
	salecopy: varchar('salecopy', { length: 45 }),
	salepricetype: int('salepricetype').notNull(),
	datecreated: datetime('datecreated', { mode: 'string' }).notNull(),
	datemodified: datetime('datemodified', { mode: 'string' }).notNull()
});

export const jobsubjob = mysqlTable(
	'jobsubjob',
	{
		jobsubjobid: int('jobsubjobid').autoincrement().notNull(),
		jobid: int('jobid')
			.notNull()
			.references(() => job.jobid),
		subjobid: int('subjobid')
			.notNull()
			.references(() => job.jobid),
		listnumber: int('listnumber').notNull()
	},
	(table) => {
		return {
			job_subjob_parent_fk_idx: index('job_subjob_parent_fk_idx').on(table.jobid),
			job_subjob_child_fk_idx: index('job_subjob_child_fk_idx').on(table.subjobid)
		};
	}
);

export const majorunit = mysqlTable('majorunit', {
	majorunitid: int('majorunitid').autoincrement().notNull(),
	mfg: int('mfg'),
	mfgname: varchar('mfgname', { length: 45 }),
	modelyear: varchar('modelyear', { length: 45 }),
	modelyearint: int('modelyearint'),
	modelcode: varchar('modelcode', { length: 45 }),
	modelname: varchar('modelname', { length: 100 }),
	importurl: varchar('importurl', { length: 255 }),
	modeltype: varchar('modeltype', { length: 45 }),
	modelcolor: varchar('modelcolor', { length: 45 }),
	uniturl: varchar('uniturl', { length: 255 }),
	linkraw: varchar('linkraw', { length: 100 }),
	modifier: varchar('modifier', { length: 45 }),
	modelfamily: varchar('modelfamily', { length: 45 })
});

export const majorunitfamily = mysqlTable('majorunitfamily', {
	majorunitfamilyid: int('majorunitfamilyid').autoincrement().notNull(),
	familyname: varchar('familyname', { length: 45 }),
	familynotes: varchar('familynotes', { length: 500 }),
	mfgname: varchar('mfgname', { length: 45 }),
	modeltype: varchar('modeltype', { length: 45 }),
	modelyearmin: int('modelyearmin'),
	modelyearmax: int('modelyearmax'),
	familynamemarketing: varchar('familynamemarketing', { length: 100 })
});

export const majorunitmajorunitfamily = mysqlTable(
	'majorunitmajorunitfamily',
	{
		majorunitmajorunitfamilyid: int('majorunitmajorunitfamilyid').autoincrement().notNull(),
		majorunitid: int('majorunitid')
			.notNull()
			.references(() => majorunit.majorunitid),
		majorunitfamilyid: int('majorunitfamilyid')
			.notNull()
			.references(() => majorunitfamily.majorunitfamilyid)
	},
	(table) => {
		return {
			majorunit_mufamily_fk_idx: index('majorunit_mufamily_fk_idx').on(table.majorunitid),
			mufamily_mufamily_fk_idx: index('mufamily_mufamily_fk_idx').on(table.majorunitfamilyid)
		};
	}
);

export const mu = mysqlTable(
	'mu',
	{
		muid: int('muid').autoincrement().notNull(),
		stocknumber: varchar('stocknumber', { length: 45 }).notNull(),
		year: int('year').notNull(),
		modelname: varchar('modelname', { length: 100 }).notNull(),
		color: varchar('color', { length: 45 }).notNull(),
		vin: varchar('vin', { length: 45 }).notNull(),
		invoice: decimal('invoice', { precision: 11, scale: 2 }).notNull(),
		msrp: decimal('msrp', { precision: 11, scale: 2 }).notNull(),
		lot: varchar('lot', { length: 45 }).notNull(),
		otdprice: decimal('otdprice', { precision: 11, scale: 2 }),
		newused: int('newused'),
		mfg: varchar('mfg', { length: 45 }),
		stater: varchar('stater', { length: 45 }),
		profitgross: decimal('profitgross', { precision: 11, scale: 2 }),
		saleprice: decimal('saleprice', { precision: 11, scale: 2 }),
		lsdatecreated: datetime('lsdatecreated', { mode: 'string' }).notNull(),
		lsdatemodified: datetime('lsdatemodified', { mode: 'string' }).notNull(),
		// Warning: Can't parse bit(1) from database
		// bit(1)Type: bit(1)("maped").notNull(),
		mapedbegindate: datetime('mapedbegindate', { mode: 'string' }),
		mapedexpiredate: datetime('mapedexpiredate', { mode: 'string' }),
		// Warning: Can't parse bit(1) from database
		// bit(1)Type: bit(1)("autorv").notNull(),
		bamstore: int('bamstore').notNull(),
		modelcode: varchar('modelcode', { length: 45 }),
		floorexpiredate: datetime('floorexpiredate', { mode: 'string' }),
		b50link: varchar('b50link', { length: 512 }),
		b50linkid: int('b50linkid'),
		b50modelname: varchar('b50modelname', { length: 100 }),
		b50saleprice: decimal('b50saleprice', { precision: 11, scale: 2 }),
		b50modeltype: varchar('b50modeltype', { length: 45 }),
		b50modeltypestyle: varchar('b50modeltypestyle', { length: 45 }),
		b50imageurl: varchar('b50imageurl', { length: 1000 }),
		b50id: varchar('b50id', { length: 36 }),
		saleprogramid: int('saleprogramid').references(() => saleprogram.saleprogramid),
		b50desc: varchar('b50desc', { length: 5000 }),
		b50datemodified: datetime('b50datemodified', { mode: 'string' }),
		b50metrictype: varchar('b50metrictype', { length: 45 }),
		b50metricvalue: int('b50metricvalue'),
		// Warning: Can't parse bit(1) from database
		// bit(1)Type: bit(1)("yellowtag").notNull(),
		freight: decimal('freight', { precision: 11, scale: 2 }).notNull(),
		msrptotal: decimal('msrptotal', { precision: 11, scale: 2 }),
		invoicetotal: decimal('invoicetotal', { precision: 11, scale: 2 }),
		salepriceexpiredate: datetime('salepriceexpiredate', { mode: 'string' }).notNull(),
		uilastmodified: datetime('uilastmodified', { mode: 'string' }).notNull(),
		b50datesynced: datetime('b50datesynced', { mode: 'string' }),
		invstatus: int('invstatus').notNull(),
		quotelevel: int('quotelevel').notNull(),
		// Warning: Can't parse bit(1) from database
		// bit(1)Type: bit(1)("recnew").notNull(),
		b50theoryproductid: int('b50theoryproductid'),
		b50theoryproductlink: varchar('b50theoryproductlink', { length: 255 }),
		recstatus: int('recstatus').notNull(),
		b50mfg: varchar('b50mfg', { length: 45 }),
		commprogram2id: int('commprogram2id').references(() => commprogram2.commprogram2id),
		commmin: decimal('commmin', { precision: 11, scale: 2 }),
		commmax: decimal('commmax', { precision: 11, scale: 2 }),
		// Warning: Can't parse bit(1) from database
		// bit(1)Type: bit(1)("printreq").notNull(),
		muflag: int('muflag').notNull(),
		salepricelastmodified: datetime('salepricelastmodified', { mode: 'string' }),
		// Warning: Can't parse bit(1) from database
		// bit(1)Type: bit(1)("hotdeal").notNull(),
		pricemfgrebate: decimal('pricemfgrebate', { precision: 11, scale: 2 }).notNull(),
		mfgrebates: varchar('mfgrebates', { length: 255 }),
		pvlprice: decimal('pvlprice', { precision: 11, scale: 2 }).default('0.00'),
		pvl: int('pvl').default(0),
		pel: int('pel').default(0),
		pvlrebates: varchar('pvlrebates', { length: 255 }),
		nap: decimal('nap', { precision: 11, scale: 2 }),
		unitstatus: varchar('unitstatus', { length: 250 }),
		estimatedarrival: datetime('estimatedarrival', { mode: 'string' }),
		cost: decimal('cost', { precision: 11, scale: 2 }).notNull(),
		standardfeatures: varchar('standardfeatures', { length: 5000 })
	},
	(table) => {
		return {
			fk_saleprogram_mu_idx: index('fk_saleprogram_mu_idx').on(table.saleprogramid),
			fk_commprogram_mu_idx: index('fk_commprogram_mu_idx').on(table.commprogram2id),
			id_UNIQUE: unique('id_UNIQUE').on(table.muid),
			b50linkid_UNIQUE: unique('b50linkid_UNIQUE').on(table.b50linkid)
		};
	}
);

export const mubk = mysqlTable('mubk', {
	muid: int('muid').default(0).notNull(),
	stocknumber: varchar('stocknumber', { length: 45 }).notNull(),
	year: int('year').notNull(),
	modelname: varchar('modelname', { length: 100 }).notNull(),
	color: varchar('color', { length: 45 }).notNull(),
	vin: varchar('vin', { length: 45 }).notNull(),
	invoice: decimal('invoice', { precision: 11, scale: 2 }).notNull(),
	msrp: decimal('msrp', { precision: 11, scale: 2 }).notNull(),
	lot: varchar('lot', { length: 45 }).notNull(),
	otdprice: decimal('otdprice', { precision: 11, scale: 2 }),
	newused: int('newused'),
	mfg: varchar('mfg', { length: 45 }),
	stater: varchar('stater', { length: 45 }),
	profitgross: decimal('profitgross', { precision: 11, scale: 2 }),
	saleprice: decimal('saleprice', { precision: 11, scale: 2 }),
	lsdatecreated: datetime('lsdatecreated', { mode: 'string' }).notNull(),
	lsdatemodified: datetime('lsdatemodified', { mode: 'string' }).notNull(),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("maped").notNull(),
	mapedbegindate: datetime('mapedbegindate', { mode: 'string' }),
	mapedexpiredate: datetime('mapedexpiredate', { mode: 'string' }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("autorv").notNull(),
	bamstore: int('bamstore').notNull(),
	modelcode: varchar('modelcode', { length: 45 }),
	floorexpiredate: datetime('floorexpiredate', { mode: 'string' }),
	b50link: varchar('b50link', { length: 512 }),
	b50linkid: int('b50linkid'),
	b50modelname: varchar('b50modelname', { length: 100 }),
	b50saleprice: decimal('b50saleprice', { precision: 11, scale: 2 }),
	b50modeltype: varchar('b50modeltype', { length: 45 }),
	b50modeltypestyle: varchar('b50modeltypestyle', { length: 45 }),
	b50imageurl: varchar('b50imageurl', { length: 1000 }),
	b50id: varchar('b50id', { length: 36 }),
	saleprogramid: int('saleprogramid'),
	b50desc: varchar('b50desc', { length: 5000 }),
	b50datemodified: datetime('b50datemodified', { mode: 'string' }),
	b50metrictype: varchar('b50metrictype', { length: 45 }),
	b50metricvalue: int('b50metricvalue'),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("yellowtag").notNull(),
	freight: decimal('freight', { precision: 11, scale: 2 }).notNull(),
	msrptotal: decimal('msrptotal', { precision: 11, scale: 2 }),
	invoicetotal: decimal('invoicetotal', { precision: 11, scale: 2 }),
	salepriceexpiredate: datetime('salepriceexpiredate', { mode: 'string' }).notNull(),
	uilastmodified: datetime('uilastmodified', { mode: 'string' }).notNull(),
	b50datesynced: datetime('b50datesynced', { mode: 'string' }),
	invstatus: int('invstatus').notNull(),
	quotelevel: int('quotelevel').notNull(),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("recnew").notNull(),
	b50theoryproductid: int('b50theoryproductid'),
	b50theoryproductlink: varchar('b50theoryproductlink', { length: 255 }),
	recstatus: int('recstatus').notNull(),
	b50mfg: varchar('b50mfg', { length: 45 }),
	commprogram2id: int('commprogram2id'),
	commmin: decimal('commmin', { precision: 11, scale: 2 }),
	commmax: decimal('commmax', { precision: 11, scale: 2 }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("printreq").notNull(),
	muflag: int('muflag').notNull(),
	salepricelastmodified: datetime('salepricelastmodified', { mode: 'string' }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("hotdeal").notNull(),
	pricemfgrebate: decimal('pricemfgrebate', { precision: 11, scale: 2 }).notNull(),
	mfgrebates: varchar('mfgrebates', { length: 255 }),
	pvlprice: decimal('pvlprice', { precision: 11, scale: 2 }).default('0.00'),
	pvl: int('pvl').default(0),
	pel: int('pel').default(0),
	pvlrebates: varchar('pvlrebates', { length: 255 }),
	nap: decimal('nap', { precision: 11, scale: 2 }),
	unitstatus: varchar('unitstatus', { length: 250 }),
	estimatedarrival: datetime('estimatedarrival', { mode: 'string' }),
	cost: decimal('cost', { precision: 11, scale: 2 }).notNull(),
	standardfeatures: varchar('standardfeatures', { length: 5000 })
});

export const mucommitem = mysqlTable(
	'mucommitem',
	{
		mucommitemid: int('mucommitemid').autoincrement().notNull(),
		itemdesc: varchar('itemdesc', { length: 45 }),
		itemamount: decimal('itemamount', { precision: 7, scale: 2 }).notNull(),
		muid: int('muid')
			.notNull()
			.references(() => mu.muid)
	},
	(table) => {
		return {
			mu_mucommitemid_fk_idx: index('mu_mucommitemid_fk_idx').on(table.muid)
		};
	}
);

export const muimages = mysqlTable(
	'muimages',
	{
		id: int('id').autoincrement().notNull(),
		muId: int('muId')
			.notNull()
			.references(() => mu.muid, { onDelete: 'cascade' }),
		muItemId: int('muItemId'),
		imgUrl: varchar('imgUrl', { length: 2500 }).notNull(),
		description: varchar('description', { length: 5000 }).notNull(),
		dataUrl: mediumtext('dataUrl'),
		order: int('order').default(0)
	},
	(table) => {
		return {
			mu_muimages_idx: index('mu_muimages_idx').on(table.muId),
			muimages_id_UNIQUE: unique('muimages_id_UNIQUE').on(table.id)
		};
	}
);

export const muitem = mysqlTable(
	'muitem',
	{
		muitemid: int('muitemid').autoincrement().notNull(),
		muid: int('muid')
			.notNull()
			.references(() => mu.muid, { onDelete: 'cascade' }),
		itemdesc: varchar('itemdesc', { length: 45 }),
		itemamount: decimal('itemamount', { precision: 7, scale: 2 }).notNull(),
		itemnumber: int('itemnumber').notNull(),
		itemflag: int('itemflag').notNull(),
		iteminvoice: decimal('iteminvoice', { precision: 7, scale: 2 }),
		begindate: datetime('begindate', { mode: 'string' }),
		expiredate: datetime('expiredate', { mode: 'string' })
	},
	(table) => {
		return {
			mu_muitem_idx: index('mu_muitem_idx').on(table.muid),
			muitemid_UNIQUE: unique('muitemid_UNIQUE').on(table.muitemid)
		};
	}
);

export const muvideo = mysqlTable(
	'muvideo',
	{
		id: int('id').autoincrement().notNull(),
		muid: int('muid').notNull(),
		platform: int('platform').notNull(),
		url: varchar('url', { length: 4000 }).notNull()
	},
	(table) => {
		return {
			id_UNIQUE: unique('id_UNIQUE').on(table.id)
		};
	}
);

export const mu_babckup = mysqlTable('mu_babckup', {
	muid: int('muid').default(0).notNull(),
	stocknumber: varchar('stocknumber', { length: 45 }).notNull(),
	year: int('year').notNull(),
	modelname: varchar('modelname', { length: 100 }).notNull(),
	color: varchar('color', { length: 45 }).notNull(),
	vin: varchar('vin', { length: 45 }).notNull(),
	invoice: decimal('invoice', { precision: 11, scale: 2 }).notNull(),
	msrp: decimal('msrp', { precision: 11, scale: 2 }).notNull(),
	lot: varchar('lot', { length: 45 }).notNull(),
	otdprice: decimal('otdprice', { precision: 11, scale: 2 }),
	newused: int('newused'),
	mfg: varchar('mfg', { length: 45 }),
	stater: varchar('stater', { length: 45 }),
	profitgross: decimal('profitgross', { precision: 11, scale: 2 }),
	saleprice: decimal('saleprice', { precision: 11, scale: 2 }),
	lsdatecreated: datetime('lsdatecreated', { mode: 'string' }).notNull(),
	lsdatemodified: datetime('lsdatemodified', { mode: 'string' }).notNull(),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("maped").notNull(),
	mapedbegindate: datetime('mapedbegindate', { mode: 'string' }),
	mapedexpiredate: datetime('mapedexpiredate', { mode: 'string' }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("autorv").notNull(),
	bamstore: int('bamstore').notNull(),
	modelcode: varchar('modelcode', { length: 45 }),
	floorexpiredate: datetime('floorexpiredate', { mode: 'string' }),
	b50link: varchar('b50link', { length: 512 }),
	b50linkid: int('b50linkid'),
	b50modelname: varchar('b50modelname', { length: 100 }),
	b50saleprice: decimal('b50saleprice', { precision: 11, scale: 2 }),
	b50modeltype: varchar('b50modeltype', { length: 45 }),
	b50modeltypestyle: varchar('b50modeltypestyle', { length: 45 }),
	b50imageurl: varchar('b50imageurl', { length: 1000 }),
	b50id: varchar('b50id', { length: 36 }),
	saleprogramid: int('saleprogramid'),
	b50desc: varchar('b50desc', { length: 5000 }),
	b50datemodified: datetime('b50datemodified', { mode: 'string' }),
	b50metrictype: varchar('b50metrictype', { length: 45 }),
	b50metricvalue: int('b50metricvalue'),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("yellowtag").notNull(),
	freight: decimal('freight', { precision: 11, scale: 2 }).notNull(),
	msrptotal: decimal('msrptotal', { precision: 11, scale: 2 }),
	invoicetotal: decimal('invoicetotal', { precision: 11, scale: 2 }),
	salepriceexpiredate: datetime('salepriceexpiredate', { mode: 'string' }).notNull(),
	uilastmodified: datetime('uilastmodified', { mode: 'string' }).notNull(),
	b50datesynced: datetime('b50datesynced', { mode: 'string' }),
	invstatus: int('invstatus').notNull(),
	quotelevel: int('quotelevel').notNull(),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("recnew").notNull(),
	b50theoryproductid: int('b50theoryproductid'),
	b50theoryproductlink: varchar('b50theoryproductlink', { length: 255 }),
	recstatus: int('recstatus').notNull(),
	b50mfg: varchar('b50mfg', { length: 45 }),
	commprogram2id: int('commprogram2id'),
	commmin: decimal('commmin', { precision: 11, scale: 2 }),
	commmax: decimal('commmax', { precision: 11, scale: 2 }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("printreq").notNull(),
	muflag: int('muflag').notNull(),
	salepricelastmodified: datetime('salepricelastmodified', { mode: 'string' }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("hotdeal").notNull(),
	pricemfgrebate: decimal('pricemfgrebate', { precision: 11, scale: 2 }).notNull(),
	mfgrebates: varchar('mfgrebates', { length: 255 }),
	pvlprice: decimal('pvlprice', { precision: 11, scale: 2 }).default('0.00'),
	pvl: int('pvl').default(0),
	pel: int('pel').default(0),
	pvlrebates: varchar('pvlrebates', { length: 255 }),
	nap: decimal('nap', { precision: 11, scale: 2 }),
	unitstatus: varchar('unitstatus', { length: 250 }),
	estimatedarrival: datetime('estimatedarrival', { mode: 'string' }),
	cost: decimal('cost', { precision: 11, scale: 2 }).notNull(),
	standardfeatures: varchar('standardfeatures', { length: 5000 })
});

export const mysale = mysqlTable(
	'mysale',
	{
		mysaleid: int('mysaleid').autoincrement().notNull(),
		portaluserid: int('portaluserid')
			.notNull()
			.references(() => portaluser.portaluserid),
		mysaledate: datetime('mysaledate', { mode: 'string' }).notNull(),
		stocknumber: varchar('stocknumber', { length: 45 }),
		mfg: varchar('mfg', { length: 45 }),
		modelyear: int('modelyear').notNull(),
		modelname: varchar('modelname', { length: 45 }),
		invoicetotal: decimal('invoicetotal', { precision: 7, scale: 2 }).notNull(),
		saletotal: decimal('saletotal', { precision: 7, scale: 2 }).notNull(),
		saleperiodid: int('saleperiodid').references(() => saleperiod.saleperiodid),
		writeupid: int('writeupid').references(() => writeup.writeupid),
		commissiontotal: decimal('commissiontotal', { precision: 6, scale: 2 }).notNull(),
		grossprofit: decimal('grossprofit', { precision: 6, scale: 2 }).notNull(),
		lot: varchar('lot', { length: 45 }),
		floorexpiredate: datetime('floorexpiredate', { mode: 'string' }),
		commissiondiscretion: decimal('commissiondiscretion', { precision: 6, scale: 2 }),
		commissionlines: decimal('commissionlines', { precision: 6, scale: 2 }).notNull(),
		discretionamount: decimal('discretionamount', { precision: 6, scale: 2 }),
		datecreated: datetime('datecreated', { mode: 'string' }).notNull(),
		createdbyportaluserid: int('createdbyportaluserid').notNull(),
		datemodified: datetime('datemodified', { mode: 'string' }).notNull(),
		modifiedbyportaluserid: int('modifiedbyportaluserid').notNull(),
		vin: varchar('vin', { length: 45 }),
		newused: int('newused').notNull(),
		customername: varchar('customername', { length: 100 })
	},
	(table) => {
		return {
			saleperiod_fk_idx: index('mysale_saleperiod_fk_idx').on(table.saleperiodid),
			my_sale_portaluser_fk_idx: index('my_sale_portaluser_fk_idx').on(table.portaluserid),
			writeup_fk_idx: index('mysale_writeup_fk_idx').on(table.writeupid)
		};
	}
);

export const mysalecommitem = mysqlTable(
	'mysalecommitem',
	{
		mysalecommitemid: int('mysalecommitemid').autoincrement().notNull(),
		mysaleid: int('mysaleid')
			.notNull()
			.references(() => mysale.mysaleid, { onDelete: 'cascade' }),
		itemname: varchar('itemname', { length: 45 }).notNull(),
		itemamount: decimal('itemamount', { precision: 6, scale: 2 }).notNull(),
		// Warning: Can't parse bit(1) from database
		// bit(1)Type: bit(1)("itemobtained").notNull(),
		listnumber: int('listnumber').notNull()
	},
	(table) => {
		return {
			mysale_mysalecommitem_fk_idx: index('mysale_mysalecommitem_fk_idx').on(table.mysaleid)
		};
	}
);

export const part = mysqlTable('part', {
	partid: int('partid').autoincrement().notNull(),
	partnumber: varchar('partnumber', { length: 45 }).notNull(),
	partname: varchar('partname', { length: 100 }),
	partdesc: varchar('partdesc', { length: 255 }),
	fomqoh: int('fomqoh').notNull(),
	fomavailable: int('fomavailable').notNull(),
	fopqoh: int('fopqoh').default(0).notNull(),
	fopavailable: int('fopavailable').default(0).notNull(),
	qoh: int('qoh').notNull(),
	available: int('available').notNull(),
	cost: decimal('cost', { precision: 6, scale: 2 }).notNull(),
	msrp: decimal('msrp', { precision: 6, scale: 2 }).notNull(),
	saleprice: decimal('saleprice', { precision: 6, scale: 2 }).default('0.00').notNull(),
	supplier: varchar('supplier', { length: 45 }).notNull(),
	category: varchar('category', { length: 45 }).notNull(),
	partnamedisplay: varchar('partnamedisplay', { length: 45 }),
	lsdatecreatedfom: datetime('lsdatecreatedfom', { mode: 'string' }),
	lsdatemodifiedfom: datetime('lsdatemodifiedfom', { mode: 'string' }),
	lsdatecreatedfop: datetime('lsdatecreatedfop', { mode: 'string' }),
	lsdatemodifiedfop: datetime('lsdatemodifiedfop', { mode: 'string' }),
	pskqoh: int('pskqoh').notNull(),
	pskavailable: int('pskavailable').notNull(),
	lsdatecreatedpsk: datetime('lsdatecreatedpsk', { mode: 'string' }),
	lsdatemodifiedpsk: datetime('lsdatemodifiedpsk', { mode: 'string' }),
	supersededto: varchar('supersededto', { length: 45 }),
	partnumbersecondary: varchar('partnumbersecondary', { length: 45 }),
	brandname: varchar('brandname', { length: 45 })
});

export const photo3d = mysqlTable(
	'photo3d',
	{
		id: int('id').autoincrement().notNull(),
		muId: int('muId').references(() => mu.muid, { onDelete: 'cascade' }),
		muItemId: int('muItemId'),
		src: varchar('src', { length: 2500 }).notNull(),
		description: varchar('description', { length: 5000 })
	},
	(table) => {
		return {
			mu_photo3did_idx: index('mu_photo3did_idx').on(table.muId),
			id_UNIQUE: unique('id_UNIQUE').on(table.id)
		};
	}
);

export const portaluser = mysqlTable('portaluser', {
	portaluserid: int('portaluserid').autoincrement().notNull(),
	firstname: varchar('firstname', { length: 45 }),
	lastname: varchar('lastname', { length: 45 }),
	portalroles: varchar('portalroles', { length: 255 }),
	portalusername: varchar('portalusername', { length: 45 }).notNull(),
	passer: varchar('passer', { length: 45 }).notNull(),
	bamstore: int('bamstore').notNull(),
	email: varchar('email', { length: 45 }).notNull(),
	storedept: varchar('storedept', { length: 45 })
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("locked").notNull(),
});

export const quote = mysqlTable(
	'quote',
	{
		quotenumber: int('quotenumber').autoincrement().notNull(),
		firstname: varchar('firstname', { length: 100 }),
		lastname: varchar('lastname', { length: 100 }),
		email: varchar('email', { length: 45 }),
		phone: varchar('phone', { length: 45 }),
		quotedatecreated: datetime('quotedatecreated', { mode: 'string' }).notNull(),
		msrpunit: decimal('msrpunit', { precision: 7, scale: 2 }),
		msrptotal: decimal('msrptotal', { precision: 7, scale: 2 }),
		saleprice: decimal('saleprice', { precision: 7, scale: 2 }),
		modelname: varchar('modelname', { length: 100 }),
		modelcode: varchar('modelcode', { length: 45 }),
		stocknumber: varchar('stocknumber', { length: 45 }),
		mfg: varchar('mfg', { length: 45 }),
		quotetype: varchar('quotetype', { length: 45 }).notNull(),
		ipaddress: varchar('ipaddress', { length: 45 }),
		bamstore: int('bamstore').notNull(),
		modeltype: varchar('modeltype', { length: 45 }),
		websitetype: varchar('websitetype', { length: 45 }),
		quotelevel: int('quotelevel')
	},
	(table) => {
		return {
			quotenumber_UNIQUE: unique('quotenumber_UNIQUE').on(table.quotenumber)
		};
	}
);

export const saleperiod = mysqlTable('saleperiod', {
	saleperiodid: int('saleperiodid').autoincrement().notNull(),
	begindate: datetime('begindate', { mode: 'string' }).notNull(),
	enddate: datetime('enddate', { mode: 'string' }).notNull(),
	targetunits: int('targetunits').notNull(),
	targetbonus: decimal('targetbonus', { precision: 7, scale: 2 }).notNull(),
	storedept: varchar('storedept', { length: 45 }),
	bamstore: int('bamstore').notNull(),
	saleperiodnotes: varchar('saleperiodnotes', { length: 255 }),
	depttargetunits: int('depttargetunits').notNull(),
	depttargetbonus: decimal('depttargetbonus', { precision: 7, scale: 2 }).notNull(),
	usedtargetunits: int('usedtargetunits').notNull(),
	usedtargetbonus: decimal('usedtargetbonus', { precision: 7, scale: 2 }).notNull()
});

export const saleprogram = mysqlTable(
	'saleprogram',
	{
		saleprogramid: int('saleprogramid').autoincrement().notNull(),
		programname: varchar('programname', { length: 45 }).notNull(),
		mfg: varchar('mfg', { length: 45 }),
		datecreated: datetime('datecreated', { mode: 'string' }).notNull(),
		datemodified: datetime('datemodified', { mode: 'string' }).notNull(),
		begindate: datetime('begindate', { mode: 'string' }),
		expiredate: datetime('expiredate', { mode: 'string' }),
		programnotes: varchar('programnotes', { length: 255 }),
		newused: int('newused').notNull(),
		pricetoshow: int('pricetoshow').notNull(),
		pvl: int('pvl').notNull(),
		pel: int('pel').notNull()
	},
	(table) => {
		return {
			saleprogramid_UNIQUE: unique('saleprogramid_UNIQUE').on(table.saleprogramid)
		};
	}
);

export const saleprogramitem = mysqlTable(
	'saleprogramitem',
	{
		saleprogramitemid: int('saleprogramitemid').autoincrement().notNull(),
		saleprogramid: int('saleprogramid')
			.notNull()
			.references(() => saleprogram.saleprogramid, { onDelete: 'cascade' }),
		itemdesc: varchar('itemdesc', { length: 45 }),
		itemamount: decimal('itemamount', { precision: 7, scale: 2 }),
		begindate: datetime('begindate', { mode: 'string' }),
		expiredate: datetime('expiredate', { mode: 'string' }),
		itemnumber: int('itemnumber').notNull(),
		itemflag: int('itemflag').notNull()
	},
	(table) => {
		return {
			fk_saleprogramid_idx: index('fk_saleprogramid_idx').on(table.saleprogramid),
			saleprogramitemid_UNIQUE: unique('saleprogramitemid_UNIQUE').on(table.saleprogramitemid)
		};
	}
);

export const writeup = mysqlTable(
	'writeup',
	{
		writeupid: int('writeupid').autoincrement().notNull(),
		customername: varchar('customername', { length: 45 }),
		email: varchar('email', { length: 45 }),
		phone: varchar('phone', { length: 45 }),
		stocknumber: varchar('stocknumber', { length: 45 }).notNull(),
		mfg: varchar('mfg', { length: 45 }).notNull(),
		modelname: varchar('modelname', { length: 100 }).notNull(),
		modelyear: varchar('modelyear', { length: 45 }).notNull(),
		newused: int('newused').notNull(),
		color: varchar('color', { length: 45 }).notNull(),
		vin: varchar('vin', { length: 45 }).notNull(),
		sellprice: decimal('sellprice', { precision: 7, scale: 2 }).notNull(),
		totalprice: decimal('totalprice', { precision: 7, scale: 2 }).notNull(),
		writeupdate: datetime('writeupdate', { mode: 'string' }).notNull(),
		leadtype: varchar('leadtype', { length: 45 }).notNull(),
		address: varchar('address', { length: 255 }),
		city: varchar('city', { length: 45 }),
		addystate: varchar('addystate', { length: 45 }),
		postalcode: varchar('postalcode', { length: 45 }),
		dateofbirth: datetime('dateofbirth', { mode: 'string' }),
		dlnumber: varchar('dlnumber', { length: 45 }),
		portaluserid: int('portaluserid')
			.notNull()
			.references(() => portaluser.portaluserid),
		modelcode: varchar('modelcode', { length: 45 }),
		modeltype: varchar('modeltype', { length: 45 }),
		writeupstatus: int('writeupstatus').notNull(),
		discretiondiscount: decimal('discretiondiscount', { precision: 6, scale: 2 }),
		expiredate: datetime('expiredate', { mode: 'string' }),
		saleprogramname: varchar('saleprogramname', { length: 45 }),
		tradeinvalue: decimal('tradeinvalue', { precision: 7, scale: 2 }),
		tradeinloanbalance: decimal('tradeinloanbalance', { precision: 7, scale: 2 }),
		firstname: varchar('firstname', { length: 45 }),
		middlename: varchar('middlename', { length: 45 }),
		lastname: varchar('lastname', { length: 45 }),
		tradeinvin: varchar('tradeinvin', { length: 45 }),
		tradeinmetrictype: varchar('tradeinmetrictype', { length: 45 }),
		tradeinmetricvalue: varchar('tradeinmetricvalue', { length: 45 }),
		tradeincolor: varchar('tradeincolor', { length: 45 }),
		tradeinmodelyear: varchar('tradeinmodelyear', { length: 45 }),
		tradeinmodelname: varchar('tradeinmodelname', { length: 45 }),
		tradeinmfg: varchar('tradeinmfg', { length: 45 }),
		specialdiscountmax: decimal('specialdiscountmax', { precision: 7, scale: 2 }).notNull(),
		specialdiscountused: decimal('specialdiscountused', { precision: 7, scale: 2 }).notNull()
	},
	(table) => {
		return {
			wrirteup_portaluser_fk_idx: index('wrirteup_portaluser_fk_idx').on(table.portaluserid)
		};
	}
);

export const writeupcommitem = mysqlTable(
	'writeupcommitem',
	{
		writeupcommitemid: int('writeupcommitemid').autoincrement().notNull(),
		writeupid: int('writeupid')
			.notNull()
			.references(() => writeup.writeupid),
		itemdesc: varchar('itemdesc', { length: 45 }),
		itemamount: decimal('itemamount', { precision: 6, scale: 2 }),
		itemamountmod: decimal('itemamountmod', { precision: 6, scale: 2 })
	},
	(table) => {
		return {
			writeup_fk_idx: index('writeupcommitem_writeup_fk_idx').on(table.writeupid)
		};
	}
);

export const writeupsaleitem = mysqlTable(
	'writeupsaleitem',
	{
		writeupsaleitemid: int('writeupsaleitemid').autoincrement().notNull(),
		writeupid: int('writeupid')
			.notNull()
			.references(() => writeup.writeupid),
		itemdesc: varchar('itemdesc', { length: 45 }),
		itemamount: decimal('itemamount', { precision: 7, scale: 2 }),
		itemnumber: int('itemnumber').notNull()
	},
	(table) => {
		return {
			fk_writeupsaleitem_writeup_idx: index('fk_writeupsaleitem_writeup_idx').on(table.writeupid),
			writeupsaleitemid_UNIQUE: unique('writeupsaleitemid_UNIQUE').on(table.writeupsaleitemid)
		};
	}
);
