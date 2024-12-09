import fs from "fs/promises";
import path from "path";


const filePath = path.join("Booking","appoinments.txt");

export const submitBooking = async (req,res)=>{
    const{name,phNo,age,dateAndTime} = req.body;
    try {
        if(!name || !phNo || !age || !dateAndTime){
            throw new Error("Please fill all the mandatory fields");
        }
        const bookingFile={
            name,
            phNo,
            age,
            dateAndTime
        };
        fs.appendFileSync(filePath,JSON.stringify(bookingFile)+ "\n","utf-8");
        res.status(201).json({success:true,message:"submitted successfully"});
        
    } catch (error) {
        res.status(400).json({success:false,message:"failed"})    
    }
}

export const modifyBooking = async (req,res)=>{
    const {phNo,dateAndTime} = req.body;
    try {
        const data = await fs.readFile(filePath,"utf-8");
        const records = data.trim().split("\n").map(line=>JSON.parse(line));
        const userIndex = records.findIndex(record=>record.phNo===phNo);
        if(userIndex===-1) throw new Error("No Bookigs found");

        records[userIndex].dateAndTime=dateAndTime;
        const updatedData = records.map(record=>JSON.stringify(record)).join('\n');
        fs.writeFile(filePath,updatedData,"utf-8");
        res.status(201).json({success:true,message:"successfully updated"})
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }

}

export const deleteBooking = async (req,res)=>{
    const{phNo} = req.body;
    try {
        const data =await fs.readFile(filePath,"utf-8");
        const users = data.split("\n").map(user=>JSON.parse(user));
        users.splice(users.findIndex(user=>user.phNo===phNo),1);
        const updatedData = users.map(user=>JSON.stringify(user)).join("\n");
        fs.writeFile(filePath,updatedData,"utf-8");
        res.status(201).json({success:true,message:"successfully delted appoinment"})

    } catch (error) {
        res.status(400).json({success:false,message:"couldnt delete appoinment"})
    }
}