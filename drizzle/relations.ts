import { relations } from "drizzle-orm/relations";
import { accpackprogram, accpack, accpackmu, mu, accpackpart, part, brochureunit, coupon, couponmu, cycletraderunit, jobcategory, job, joblaborrate, jobsaleprogram, majorunitfamily, jobactioncategory, jobaction, jobjobaction, jobmajorunit, majorunit, jobmajorunitfamily, jobpartgroup, jobpartgrouppart, jobperformancelog, jobsubjob, majorunitmajorunitfamily, commprogram2, saleprogram, mucommitem, muimages, muitem, saleperiod, mysale, writeup, portaluser, mysalecommitem, photo3d, saleprogramitem, writeupcommitem, writeupsaleitem } from "./schema";

export const accpackRelations = relations(accpack, ({one, many}) => ({
	accpackprogram: one(accpackprogram, {
		fields: [accpack.accpackprogramid],
		references: [accpackprogram.accpackprogramid]
	}),
	accpackmus: many(accpackmu),
	accpackparts: many(accpackpart),
}));

export const accpackprogramRelations = relations(accpackprogram, ({many}) => ({
	accpacks: many(accpack),
}));

export const accpackmuRelations = relations(accpackmu, ({one}) => ({
	accpack: one(accpack, {
		fields: [accpackmu.accpackid],
		references: [accpack.accpackid]
	}),
	mu: one(mu, {
		fields: [accpackmu.muid],
		references: [mu.muid]
	}),
}));

export const muRelations = relations(mu, ({one, many}) => ({
	accpackmus: many(accpackmu),
	brochureunits: many(brochureunit),
	couponmus: many(couponmu),
	cycletraderunits: many(cycletraderunit),
	commprogram2: one(commprogram2, {
		fields: [mu.commprogram2id],
		references: [commprogram2.commprogram2id]
	}),
	saleprogram: one(saleprogram, {
		fields: [mu.saleprogramid],
		references: [saleprogram.saleprogramid]
	}),
	mucommitems: many(mucommitem),
	muimages: many(muimages),
	muitems: many(muitem),
	photo3ds: many(photo3d),
}));

export const accpackpartRelations = relations(accpackpart, ({one}) => ({
	accpack: one(accpack, {
		fields: [accpackpart.accpackid],
		references: [accpack.accpackid]
	}),
	part: one(part, {
		fields: [accpackpart.partid],
		references: [part.partid]
	}),
}));

export const partRelations = relations(part, ({many}) => ({
	accpackparts: many(accpackpart),
	jobpartgroupparts: many(jobpartgrouppart),
}));

export const brochureunitRelations = relations(brochureunit, ({one}) => ({
	mu: one(mu, {
		fields: [brochureunit.muid],
		references: [mu.muid]
	}),
}));

export const couponmuRelations = relations(couponmu, ({one}) => ({
	coupon: one(coupon, {
		fields: [couponmu.couponid],
		references: [coupon.couponid]
	}),
	mu: one(mu, {
		fields: [couponmu.muid],
		references: [mu.muid]
	}),
}));

export const couponRelations = relations(coupon, ({many}) => ({
	couponmus: many(couponmu),
}));

export const cycletraderunitRelations = relations(cycletraderunit, ({one}) => ({
	mu: one(mu, {
		fields: [cycletraderunit.muid],
		references: [mu.muid]
	}),
}));

export const jobRelations = relations(job, ({one, many}) => ({
	jobcategory: one(jobcategory, {
		fields: [job.jobcategoryid],
		references: [jobcategory.jobcategoryid]
	}),
	joblaborrate: one(joblaborrate, {
		fields: [job.joblaborrateid],
		references: [joblaborrate.joblaborrateid]
	}),
	jobsaleprogram: one(jobsaleprogram, {
		fields: [job.jobsaleprogramid],
		references: [jobsaleprogram.jobsaleprogramid]
	}),
	majorunitfamily: one(majorunitfamily, {
		fields: [job.majorunitfamilyid],
		references: [majorunitfamily.majorunitfamilyid]
	}),
	jobjobactions: many(jobjobaction),
	jobmajorunits: many(jobmajorunit),
	jobmajorunitfamilies: many(jobmajorunitfamily),
	jobpartgroups: many(jobpartgroup),
	jobperformancelogs: many(jobperformancelog),
	jobsubjobs_subjobid: many(jobsubjob, {
		relationName: "jobsubjob_subjobid_job_jobid"
	}),
	jobsubjobs_jobid: many(jobsubjob, {
		relationName: "jobsubjob_jobid_job_jobid"
	}),
}));

export const jobcategoryRelations = relations(jobcategory, ({many}) => ({
	jobs: many(job),
}));

export const joblaborrateRelations = relations(joblaborrate, ({many}) => ({
	jobs: many(job),
}));

export const jobsaleprogramRelations = relations(jobsaleprogram, ({many}) => ({
	jobs: many(job),
}));

export const majorunitfamilyRelations = relations(majorunitfamily, ({many}) => ({
	jobs: many(job),
	jobmajorunitfamilies: many(jobmajorunitfamily),
	majorunitmajorunitfamilies: many(majorunitmajorunitfamily),
}));

export const jobactionRelations = relations(jobaction, ({one, many}) => ({
	jobactioncategory: one(jobactioncategory, {
		fields: [jobaction.jobactioncategoryid],
		references: [jobactioncategory.jobactioncategoryid]
	}),
	jobjobactions: many(jobjobaction),
}));

export const jobactioncategoryRelations = relations(jobactioncategory, ({many}) => ({
	jobactions: many(jobaction),
}));

export const jobjobactionRelations = relations(jobjobaction, ({one}) => ({
	jobaction: one(jobaction, {
		fields: [jobjobaction.jobactionid],
		references: [jobaction.jobactionid]
	}),
	job: one(job, {
		fields: [jobjobaction.jobid],
		references: [job.jobid]
	}),
}));

export const jobmajorunitRelations = relations(jobmajorunit, ({one}) => ({
	job: one(job, {
		fields: [jobmajorunit.jobid],
		references: [job.jobid]
	}),
	majorunit: one(majorunit, {
		fields: [jobmajorunit.majorunitid],
		references: [majorunit.majorunitid]
	}),
}));

export const majorunitRelations = relations(majorunit, ({many}) => ({
	jobmajorunits: many(jobmajorunit),
	majorunitmajorunitfamilies: many(majorunitmajorunitfamily),
}));

export const jobmajorunitfamilyRelations = relations(jobmajorunitfamily, ({one}) => ({
	job: one(job, {
		fields: [jobmajorunitfamily.jobid],
		references: [job.jobid]
	}),
	majorunitfamily: one(majorunitfamily, {
		fields: [jobmajorunitfamily.majorunitfamilyid],
		references: [majorunitfamily.majorunitfamilyid]
	}),
}));

export const jobpartgroupRelations = relations(jobpartgroup, ({one, many}) => ({
	job: one(job, {
		fields: [jobpartgroup.jobid],
		references: [job.jobid]
	}),
	jobpartgroupparts: many(jobpartgrouppart),
}));

export const jobpartgrouppartRelations = relations(jobpartgrouppart, ({one}) => ({
	part: one(part, {
		fields: [jobpartgrouppart.partid],
		references: [part.partid]
	}),
	jobpartgroup: one(jobpartgroup, {
		fields: [jobpartgrouppart.jobpartgroupid],
		references: [jobpartgroup.jobpartgroupid]
	}),
}));

export const jobperformancelogRelations = relations(jobperformancelog, ({one}) => ({
	job: one(job, {
		fields: [jobperformancelog.jobid],
		references: [job.jobid]
	}),
}));

export const jobsubjobRelations = relations(jobsubjob, ({one}) => ({
	job_subjobid: one(job, {
		fields: [jobsubjob.subjobid],
		references: [job.jobid],
		relationName: "jobsubjob_subjobid_job_jobid"
	}),
	job_jobid: one(job, {
		fields: [jobsubjob.jobid],
		references: [job.jobid],
		relationName: "jobsubjob_jobid_job_jobid"
	}),
}));

export const majorunitmajorunitfamilyRelations = relations(majorunitmajorunitfamily, ({one}) => ({
	majorunitfamily: one(majorunitfamily, {
		fields: [majorunitmajorunitfamily.majorunitfamilyid],
		references: [majorunitfamily.majorunitfamilyid]
	}),
	majorunit: one(majorunit, {
		fields: [majorunitmajorunitfamily.majorunitid],
		references: [majorunit.majorunitid]
	}),
}));

export const commprogram2Relations = relations(commprogram2, ({many}) => ({
	mus: many(mu),
}));

export const saleprogramRelations = relations(saleprogram, ({many}) => ({
	mus: many(mu),
	saleprogramitems: many(saleprogramitem),
}));

export const mucommitemRelations = relations(mucommitem, ({one}) => ({
	mu: one(mu, {
		fields: [mucommitem.muid],
		references: [mu.muid]
	}),
}));

export const muimagesRelations = relations(muimages, ({one}) => ({
	mu: one(mu, {
		fields: [muimages.muId],
		references: [mu.muid]
	}),
}));

export const muitemRelations = relations(muitem, ({one}) => ({
	mu: one(mu, {
		fields: [muitem.muid],
		references: [mu.muid]
	}),
}));

export const mysaleRelations = relations(mysale, ({one, many}) => ({
	saleperiod: one(saleperiod, {
		fields: [mysale.saleperiodid],
		references: [saleperiod.saleperiodid]
	}),
	writeup: one(writeup, {
		fields: [mysale.writeupid],
		references: [writeup.writeupid]
	}),
	portaluser: one(portaluser, {
		fields: [mysale.portaluserid],
		references: [portaluser.portaluserid]
	}),
	mysalecommitems: many(mysalecommitem),
}));

export const saleperiodRelations = relations(saleperiod, ({many}) => ({
	mysales: many(mysale),
}));

export const writeupRelations = relations(writeup, ({one, many}) => ({
	mysales: many(mysale),
	portaluser: one(portaluser, {
		fields: [writeup.portaluserid],
		references: [portaluser.portaluserid]
	}),
	writeupcommitems: many(writeupcommitem),
	writeupsaleitems: many(writeupsaleitem),
}));

export const portaluserRelations = relations(portaluser, ({many}) => ({
	mysales: many(mysale),
	writeups: many(writeup),
}));

export const mysalecommitemRelations = relations(mysalecommitem, ({one}) => ({
	mysale: one(mysale, {
		fields: [mysalecommitem.mysaleid],
		references: [mysale.mysaleid]
	}),
}));

export const photo3dRelations = relations(photo3d, ({one}) => ({
	mu: one(mu, {
		fields: [photo3d.muId],
		references: [mu.muid]
	}),
}));

export const saleprogramitemRelations = relations(saleprogramitem, ({one}) => ({
	saleprogram: one(saleprogram, {
		fields: [saleprogramitem.saleprogramid],
		references: [saleprogram.saleprogramid]
	}),
}));

export const writeupcommitemRelations = relations(writeupcommitem, ({one}) => ({
	writeup: one(writeup, {
		fields: [writeupcommitem.writeupid],
		references: [writeup.writeupid]
	}),
}));

export const writeupsaleitemRelations = relations(writeupsaleitem, ({one}) => ({
	writeup: one(writeup, {
		fields: [writeupsaleitem.writeupid],
		references: [writeup.writeupid]
	}),
}));