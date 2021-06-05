const Duty = require('./model')

getSlot = (req, res) => {
    
   Duty
        .find({})
        .then((val) => {
            return res.status(201).json({
                success: true,
                data:val,
                message: 'Data Fetched Successfully!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Data Not created!',
            })
        })
}

// bookSlot = async (req, res) => {
//     const body = req.body
//     const name=body["name"];
//     const myDate=body["date"];
    
    
//     var val=await Duty.find({sewadars: { $in: [name] }})
//     console.log(val);
//    if(val.length!=0){
//         return res.status(200).json({
//             success:false,
//             message: 'Sewa Already Booked for this Name',
//         });
//     }
//    console.log(val);
    
//    Duty.findOne({ date: myDate}, (err, duty) => {
//         if (err) {
//             return res.status(404).json({
//                 err,
//                 message: 'Data Not Found!!',
//             })
//         }

//         var arr=[];
//         for(var i=0;i<duty.sewadars.length;i++){
//             arr.push(duty.sewadars[i]);
//         }

//         var allBooked=true;
//         for(var i=0;i<duty.sewadars.length;i++){
//             if(arr[i]==''){
//                 arr[i]=name;
//                 allBooked=false;
//                 break;
//             }
//         }
        
//         if(allBooked){
//             return res.status(200).json({
//                 success:false,
//                 message: 'All Slots Booked at '+myDate,
//             });
//         }

//         duty.sewadars=arr;
//         duty
//             .save()
//             .then(() => {
//                 return res.status(200).json({
//                     success: true,
//                     message: 'Slot Booked Successfully!',
//                 })
//             })
//             .catch(error => {
//                 return res.status(404).json({
//                     error,
//                     message: 'Slot Not Booked !!',
//                 })
//             })
//     })
// }

bookSlot = async (req, res) => {
    const body = req.body
    const name=body["name"];
    const myDate=body["date"];
    const sewadarNumber=body["sewadarNumber"];
    
    var val=await Duty.find({sewadars: { $in: [name] }})
    console.log(val);
   if(val.length!=0){
        return res.status(200).json({
            success:false,
            message: 'Sewa Already Booked for this Name',
        });
    }
   console.log(val);
    
   Duty.findOne({ date: myDate}, (err, duty) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Data Not Found!!',
            })
        }

        var arr=[];
        for(var i=0;i<duty.sewadars.length;i++){
            arr.push(duty.sewadars[i]);
        }

        arr[sewadarNumber-1]=name;

        
        // if(allBooked){
        //     return res.status(200).json({
        //         success:false,
        //         message: 'All Slots Booked at '+myDate,
        //     });
        // }

        duty.sewadars=arr;
        duty
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    message: 'Slot Booked Successfully!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Slot Not Booked !!',
                })
            })
    })
}


createSlot = async (req, res) => {
    const body=req.body;
   
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Please Provide Data',
        })
    }

    var arr=[];
    for(var i=1;i<=body["member"];i++){
        arr.push("");
    }

    
    var currentYear=new Date().getFullYear();
    console.log(currentYear);
    var days=new Date(currentYear,body["month"],0).getDate();
    console.log(days);
    var data=[];
    var gsDayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];
    for(var i=1;i<=days;i++){
    var myDate=currentYear+"-"+body["month"]+"-"+i;
    var d = new Date(myDate);
    var dayName = gsDayNames[d.getDay()];
        data.push({
            "date":myDate,
            "day":dayName,
            "sewadars":arr
          });
        }
    console.log(data)      
    await Duty.deleteMany({}).then(function(){
            console.log("Data deleted"); // Success
        }).catch(function(error){
        return res.status(400).json({ success: false, error: err })

        }); 

    await Duty.collection.insert(data, function (err, docs) {
            if (err){ 
                 return res.status(400).json({ success: false, error: err })

            } else {
              console.log("Multiple documents inserted to Collection");
            }
          });

    return res.status(200).json({
        success:true,
        message:"Data Inserted Successfully"
    })


}  
    
saveSlot = async (req, res) => {
    const body=req.body;
   
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Please Provide Data',
        })
    }

    
    await Duty.deleteMany({}).then(function(){
            console.log("Data deleted"); // Success
        }).catch(function(error){
        return res.status(400).json({ success: false, error: err })

        }); 

    await Duty.collection.insert(data, function (err, docs) {
            if (err){ 
                 return res.status(400).json({ success: false, error: err })

            } else {
              console.log("Multiple documents inserted to Collection");
            }
          });

    return res.status(200).json({
        success:true,
        message:"Data Inserted Successfully"
    })
}


module.exports = {
   getSlot,
   bookSlot,
   createSlot,
   saveSlot 
}