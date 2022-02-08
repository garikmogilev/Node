async function getRecordsByField(table, field, context)
{
    const fields = {};
    fields[table] = field;

    if (field)
    {
        return await context.getOne(table, fields);
    }
    else
    {
        return await context.getAll(table);
    }

}

async function mutateRecord(table, idField, fields, context)
{
    let records = {};

            records = await context.getExist(table, idField);

                    if (records.length > 0) {
                        await context.update(table, fields);
                    } else {
                        await context.insert(table, fields);
                    }
                    records = await context.getOne(table, fields);

    return records[0];
}
async function deleteRow(table, id, context)
{
    let recordIdObject = {};
    recordIdObject[table] = id;
    let targetFaculty = await context.getOne(table, recordIdObject);
    context.deleteRow(table, id);
        return targetFaculty[0];


}


module.exports =
    {
        getFaculties: (args, context) => getRecordsByField('FACULTY', args.faculty, context),
        getPulpits: (args, context) => getRecordsByField('PULPIT', args.pulpit, context),
        getSubjects: async (args, context) =>
        {
            if(args.faculty) {
                return await context.getPulpitsFaculty(args.faculty);
            }else {
                return await getRecordsByField('SUBJECT', args.subject, context);
            }
        },
        getTeachers: async (args, context) =>
        {
            if(args.faculty){
                return await context.getTeachersFaculty(args.faculty);
            }else {
                return await getRecordsByField('TEACHER', args.teacher, context);
            }
        },
//-------- insert data----------//
        setFaculty: async (args, context) =>
        {
            let fields = {FACULTY: args.faculty.FACULTY, FACULTY_NAME: args.faculty.FACULTY_NAME};
            return await mutateRecord('FACULTY', fields.FACULTY, fields, context);
        },
        setPulpit: async (args, context) =>
        {
            let fields = {PULPIT: args.pulpit.PULPIT, PULPIT_NAME: args.pulpit.PULPIT_NAME, FACULTY: args.pulpit.FACULTY};
            return mutateRecord('PULPIT', fields.PULPIT, fields, context);
        },
        setSubject: async (args, context) =>
        {
            let fields = {SUBJECT: args.subject.SUBJECT, SUBJECT_NAME: args.subject.SUBJECT_NAME, PULPIT: args.subject.PULPIT};
            return mutateRecord('SUBJECT', fields.SUBJECT, fields, context);
        },
        setTeacher: async (args, context) =>
        {
            let fields = {TEACHER: args.teacher.TEACHER, TEACHER_NAME: args.teacher.TEACHER_NAME,GENDER: args.teacher.GENDER, PULPIT: args.teacher.PULPIT};
            return mutateRecord('TEACHER', fields.TEACHER, fields, context);
        },
//-------- deleting data----------//
        delFaculty: (args, context) => deleteRow('FACULTY', args.Faculty, context),
        delPulpit: (args, context) => deleteRow('PULPIT', args.Pulpit, context),
        delSubject: (args, context) => deleteRow('SUBJECT', args.Subject, context),
        delTeacher: (args, context) => deleteRow('TEACHER', args.Teacher, context)
    };