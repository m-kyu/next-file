
import path from "path";
import fs from "fs/promises";

export async function POST(req){
    try{
        await fs.readdir(path.join(process.cwd() + "/public","/images"))
    }catch(err){
        await fs.mkdir(path.join(process.cwd() + "/public","/images"))
    }
    const data = await req.formData();
    const title = data.get('title');
    const file = data.get('myImage');
    if(!file) return Response.json('실패');
    
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const path2 = `./public/images/${file.name}`
    await fs.writeFile(path2,buffer)
  
    return Response.json({done:"ok",file:file.name})
}
