const {Job} = require('./../Model/JobModel');
class APIFeatures
{
    constructor(query,queryString)
    {
        this.query = query;
        this.queryString = queryString;
    }
    search()
    {
        const keyword = this.queryString.keyword ? {
            name : {
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({...keyword})
        return this    
    }
    filter()
    {
        const queryObject = {...this.queryString};

        //Remove fields from the query
        const RemoveFields = ['page', 'sort', 'limit', 'keyword'];
        RemoveFields.forEach(el => delete queryObject[el]);
        
        //Advance Filter
        let queryStr = JSON.stringify(queryObject);
        queryStr = queryStr.replace('/\b(gte|gt|lte|lt|\b/g)', match => `$${match}`);


        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    paginate()
    {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page-1)*limit;
        this.query  = this.query.skip(skip).limit(limit);
        return this;
    }
}
exports.getAllJob= async (req, res) => 
{ 
    try
    { 
        const features = new APIFeatures(Job.find(),req.query)
        .search()
        .filter()
        .paginate()

        const job = await features.query;

       //SEND RESPONSE
        res
        .status(202)
        .json({
            status: 'Success',
            result: job.length,
            data: { job }
        });
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send('Server error');
        return;
    }   
}
exports.getJobById = async (req, res) => 
{
    try
    {
        const id = req.params.id;
        const job = await Job.findById(id);
        res
       .status(202)
       .json({
            status: 'Success',
            result: job,
            data: { job }
       })    
    }
    catch(err)
    {
        console.log(err);
        return res.status(404).json({
                         status: 'Error',
                         message: 'Invalid Job'

    })
}
}   
exports.createJob= async (req, res)=> 
{   
    try {
    const NewJob = await Job.create(req.body)
    console.log(NewJob)
            res.status(202).json({
            status: 'Success',
            data: {
                Job : NewJob
            }
        });
    } 
    catch (error) 
    {
        res.status(404).json({
                    status: 'Error',
                    message: 'Invalid Job'
                })
    }

}
exports.updateJob = async (req, res) => {

    try
    {
        const id = req.params.id;
        const job = await Job.findByIdAndUpdate(id,req.body,{
            new : true
        })
        res
       .status(202)
       .json({
            status: 'Success',
            Updated_data: { job }
       })    
    }
    catch(err)
    {
        console.log(err);
        return res.status(404).json({
                         status: 'Error',
                         message: 'Invalid Job'

    })
} 
}
exports.deleteJob = async (req, res) => {

    try
    {
        const id = req.params.id;
        const DeletedJob = await Job.findByIdAndRemove(id,req.body)
        res
       .status(202)
       .json({
            status: 'Success',
           Deleted_data: DeletedJob
       })    
    }
    catch(err)
    {
        console.log(err);
        return res.status(404).json({
                         status: 'Error',
                         message: 'Invalid Job'

    })
} 
}