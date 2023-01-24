const express = require('express');
const router = express.Router(); //Calling the router Middleware with express Library
const JobController = require('../controller/JobController.js')

router
.route('/')
.get(JobController.getAllJob)
.post(JobController.createJob)
router
.route('/:id')
.get(JobController.getJobById)
.put(JobController.updateJob)
.patch(JobController.updateJob)
.delete(JobController.deleteJob)
module.exports = router;