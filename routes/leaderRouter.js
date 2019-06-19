const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();


leaderRouter.use(bodyParser.json());


leaderRouter.route('/')

.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
   })
 
   .get((req,res,next) => {
          res.end('will send all the leaders to you');
   })
 
  .post((req,res,next) => {
     res.end('will add leader: ' + req.body.name +
      'with details: ' + req.body.description);
   })
 
 .put((req,res,next) => {
     res.statusCode = 403;
     res.end('put operation not supported on /leaders');
   })
 
 .delete((req,res,next) => {
     res.end('deleting all the leaders');
 });

leaderRouter.route('/:leaderId')

 .get((req,res,next) => {
  res.end('Will send details of the promotions: ' + req.params.leaderId +' to you!');
})

.post((req, res, next) => {
res.statusCode = 403;
res.end('POST operation not supported on /promotions/'+ req.params.leaderId);
})

.put((req, res, next) => {
res.write('Updating the promotion: ' + req.params.leaderId + '\n');
res.end('Will update the promotion: ' + req.body.name + 
      ' with details: ' + req.body.description);
})

.delete((req, res, next) => {
  res.end('Deleting promotion: ' + req.params.leaderId);
});


module.exports = leaderRouter;