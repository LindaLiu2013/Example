import * as express from "express";

 let router = express.Router();

   router.use('/api/admin', (req, res)=>{
     res.send('admin');
   });

export=router;
