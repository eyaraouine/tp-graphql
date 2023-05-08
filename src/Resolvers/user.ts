export const user = {
    cvs: (user, args, { db }) => db.cv.filter((cv: any) => cv.idUser === user.id)
}