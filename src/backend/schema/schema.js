const mongoose = require('mongoose');
const { Schema } = mongoose;

// user schema
const resumeSchema = new Schema({
    firstName: String, 
    lastName: String,  
    email: String,  
    age: String,
    country: String,
    city: String, 
    phoneNumber: String, 
    jobTitle: String, 
    linkedinLink: String,
    facebookLink: String,
    portfolioLink: String,
    githubLink: String,
    experience: String,
    sideProjects: String, 
    skills: String,
    schoolName: String, 
    relevantCourses: String, 
    degree: String, 
    gpa: String,
    certificates: String,
    gender: String
});

module.exports= resumeSchema;