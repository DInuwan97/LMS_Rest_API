const express = require('express');
const assignmentRoute = express.Router();

let Assignment = require('../models/Assignment');

//create
assignmentRoute.route('/add').post(function (req,res){
    const assignment = new Assignment(req.body);
    assignment.save()
        .then(assignment =>{
            res.status(200).json({'assignment': 'assignment added successfully'})
        })
        .catch(err=>{
            res.status(400).send("Unable to Save");
        })
})

//get
assignmentRoute.route('/').get(function(req,res){
    Assignment.find(function(err,assignment){
        if(err){
            console.log(err);
        }else{
            res.json(assignment);
        }
    });
});

//delete
assignmentRoute.route('/delete/:id').get(function(req,res){
    Assignment.findByIdAndRemove({_id:req.params.id}, function(err,assignment){
        if(err) res.json(err);
        else res.json('Successfully Rmoved');
    });
});

module.exports = assignmentRoute;