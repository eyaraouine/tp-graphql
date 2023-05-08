export const cv = {
    skills: (cv, args, { db }) => {
        const skills = []
        for (const element of db.cv_skill) {
            if (cv.id === element.idCv) {
                skills.push(db.skill.find((skill: any) => skill.id === element.idSkill))
            }
        }
        return skills
    },
    user: (cvs, args, { db }) => {
        const c = db.cv.find((cv: any) => cv.id === cvs.id)
        return db.user.find((user: any) => user.id === c.idUser)
    }
}