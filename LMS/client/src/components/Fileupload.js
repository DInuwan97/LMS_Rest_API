import React, {Fragment,useState} from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';

const FileUpload = () =>{

    //setting up states and hadling states using react hooks
    const [file,setFile] = useState(''); //no any file in default state
    const [fileName,setFilename] = useState('Choose File');
    const [uploadedFile,setUploadedFile] = useState({});
    const [message,setMessage] = useState('');
    const [uploadPrecentage,setUploadPrecentage] = useState(0);

    const onChange = e =>{
        //single file upload 
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = async e =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('file',file);

        try{
            const res = await axios.post('/upload',formData,{
                headers:{
                    'Contet-Type': 'multipart/form-data'
                },

                onUploadProgress : progressEvent =>{
                    setUploadPrecentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))

                    //clear precentage
                    setTimeout(()=> setUploadPrecentage(0),1000);

                }
            });

            const {fileName,filePath} = res.data;

            setUploadedFile({fileName,filePath});

            setMessage('File Uploaded');
        }catch(err){
            if(err.response.status === 500){
                setMessage('There was a problem with the server');
            }else{
                setMessage(err.response.data.msg);
            }
        }
    }


return (
    <Fragment>
        <div>
            <h1 alisgn="center">Upload Your Assignements Here</h1>
            <br/>
            <h2><img src="https://img.icons8.com/color/48/000000/key.png" />File name shoud be your index number and assignemnt ID</h2>
            <br/>
       
        </div>

        <h2>
            {message ? <Message msg={message} /> : null}

            <form onSubmit={onSubmit}>

                <div className="custome-file mb-4">
                    <input type="file"
                        className="custom-file-input"
                        id="customFile"
                        onChange={onChange}
                    />

                    <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
                </div>

                <Progress precentage={uploadPrecentage}/>

                <input type="submit"
                    value="Upload"
                    className="btn btn-primary btn-block mt-4"
                />

            </form>




            {
                uploadedFile ? (
                    <div className="row mt-5">
                        <div className="col-md-6 m-auto">
                            <h3 className="text-center">{uploadedFile.fileName}</h3>
                            <img style={{width: '100%'}} src={uploadedFile.filePath} alt=""/>
                        </div>
                    </div>
                ):null
            }






        </h2>
    </Fragment>
)


}

export default FileUpload;