export const skill = {
    cvs: (skill, args, { db }) => {
        const cvs = []
        for (const element of db.cv_skill) {
            if (skill.id === element.idSkill) {
                cvs.push(db.cv.find((cv: any) => cv.id === element.idCv))
            }
        }
        return cvs
    }
}