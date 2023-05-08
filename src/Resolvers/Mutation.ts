import { GraphQLError } from "graphql";
import { user } from "./user";
export const Mutation={
    addCv:(parent,{input},{db,pubSub},infos)=>{
        const userId = input.idUser;
        const skillIds = input.skillIds;
        if(!db.user.some((user)=>user.id===userId)){
            console.log("id:",userId);
            throw new Error(`Le user d'id ${userId} n'existe pas`);
        }
        if(!skillIds.every((skillId) => db.skill.some((skill) => skill.id === skillId))) {
            throw new Error(`Un ou plusieurs skills n'existent pas`);
        }
        const cv={
          id: db.cv.length + 1,
          ...input,

      } 
        skillIds.forEach((skillId)=>{
          console.log(skillId)
          const skillCV={
            id: db.cv_skill.length+1,
            idCv:cv.id ,
            idSkill: skillId}
            db.cv_skill.push(skillCV)
        })  
        console.log(cv); 
        db.cv.push(cv);
        pubSub.publish('cvAdded',cv)
        return cv;
    },
    updateCv: (parent, { id, input }, { db,pubSub }, info) => {
        const cvIndex = db.cv.findIndex((cv) => cv.id === id);
        if (cvIndex === -1) {
          throw new Error(`Le cv d'id ${id} n'existe pas`);
        }
        const userId = input.userId;
        if (userId&&!db.user.some((user) => user.id === userId)) {
          throw new Error(`Le user d'id ${userId} n'existe pas`);
        }
       
        const updatedCv = {
          id:id,
          name:input.name??db.cv[cvIndex].name,
          age:input.age??db.cv[cvIndex].age,
          job:input.job??db.cv[cvIndex].job,
          idUser:input.userId??db.cv[cvIndex].idUser,
          //user:input.userId??db.cv[cvIndex].user,   

        };
        const skillIds = input.skillIds;
        if (skillIds&&!skillIds.every((skillId) => db.skill.some((skill) => skill.id === skillId))) {
          throw new Error(`Un ou plusieurs skills n'existent pas`);
        }
    else if(skillIds){    
 const cv_skill = db.cv_skill.find((cv) => cv.idCv === id);

if (cv_skill) {
  // Remove all existing skills associated with the current CV
  db.cv_skill = db.cv_skill.filter((cv) => cv.idCv !== id);

  // Add new skills to the CV
  skillIds.forEach((skillId) => {
    if (db.skill.some((skill) => skill.id === skillId)) {
      db.cv_skill.push({
        id: db.cv_skill.length + 1,
        idCv: id,
        idSkill: skillId
      });
    } else {
      throw new Error(`Skill with ID ${skillId} does not exist`);
    }
  })}}
        db.cv[cvIndex] = updatedCv;
        pubSub.publish("cvUpdated",updatedCv);
        
        return updatedCv;
      },
      deleteCv: (parent, { id }, { db,pubSub }, info) => {
        const cvIndex = db.cv.findIndex((cv) => cv.id === id);
        if (cvIndex === -1) {
          throw new Error(`Le CV d'id ${id} n'existe pas`);
        }
        const deletedCv = db.cv.splice(cvIndex, 1)[0];
        console.log(deletedCv)
        //pubSub.publish('DeletedCv', {CvDeleted: deletedCv})
        pubSub.publish("cvDeleted",deletedCv);
        return deletedCv;
      }
      
    };
 
    
    
    