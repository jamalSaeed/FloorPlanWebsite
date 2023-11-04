import React, { useEffect, useState } from "react";
import "./Floorplanlayout.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import { Button, useStepContext } from "@mui/material";
import logoImg from "../../src/Images/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Nav from "../Components/Nav/Nav";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';


import AddIcon from "@mui/icons-material/Add";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useFormik } from 'formik';
import * as Yup from 'yup';



const Floorplanlayout = () => {
  const [options, setOptions] = useState([

    { value: "Main door", label: "Main door" },
    { value: "Living Room", label: "Living Room" },
    { value: "Bed room", label: "Bed room" },
    { value: "Bath", label: "Bath" },
    { value: "Kitchen", label: "Kitchen" },
    { value: "Yard", label: "Yard" },
  ]);

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    date: Yup.date().required('Date is required'),
    remarks: Yup.string().required('Remarks is required'),
    mainImage: Yup.mixed().required('Main Image is required'),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLocation, setNewLocation] = useState('');



  const [count, setCount] = useState([1]);

  const [descriptionArr, setDescriptionArr] = useState([""]);

  const [location, setLocation] = useState("");
  const [locationArr, setLocationArr] = useState([]);

  const [mainImageFile, setMainImageFile] = useState();
  const [mainImgArr, setMainImgArr] = useState([]);
  





  const buttonStyle = {
    color: "white",
    borderRadius: "10px",
    backgroundColor: "#1f4879",

    border: "2px solid white",
    textTransform: "Capitalize"
  };
  const buttonStyleSubmit = {
    color: "white",
    borderRadius: "10px",
    backgroundColor: "#1f4879",
    border: "2px solid white",
    textTransform: "none",
  };


  const handleDescriptionChange = (e, index) => {
    const updatedDescriptionArr = [...descriptionArr];
    updatedDescriptionArr[index] = e.target.value;

    // Check if the description is empty or just whitespace and set it to an empty string
    if (e.target.value.trim() === '') {
      updatedDescriptionArr[index] = '';
    }

    // Update the state with the modified array
    setDescriptionArr(updatedDescriptionArr);
  };


  const handleSubmit = async (e) => {


    // console.log("images are", mainImgArr)
    const filteredDescriptionArr = descriptionArr.filter((desc) => desc.trim() !== "");

    locationArr.map((item, index) => {
      console.log(`location at index ${index} is : `, item)
    })

    descriptionArr.map((item, index) => {
      console.log(`description at index ${index} is : `, item)
    })

    mainImgArr.map((item, index) => {
      console.log(`img at index ${index} is : `, item)
    })


    const formData = new FormData();
    formData.append("name", formik.values.name);
    formData.append("address", formik.values.address);
    formData.append("remarks", formik.values.remarks);
    formData.append("date", formik.values.date);

    if (formik.values.mainImage) {
      formData.append("mainImage", formik.values.mainImage);
    } else {
      formData.append("mainImage", "");
    }


    for (const selectedOption of locationArr) {
      formData.append("location", selectedOption || ""); // Use an empty string if selectedOption is falsy
    }
    // for (const selectedOption of locationArr) {
    //   formData.append("location", selectedOption);
    // }

    for (const desc of descriptionArr) {
      formData.append("description", desc || ""); // Use an empty string if desc is falsy
    }

    // for (const desc of filteredDescriptionArr) {
    //   formData.append("description", desc);
    // }

    const imgCount = [];

    // Loop through each sub-array in mainImgArr
    mainImgArr.forEach((imgArray, index) => {
      const countArray = [];
      if (imgArray.length === 0) {
        setErrors({ ...errors, imgError: "Upload all images" })
      } else{
        setErrors({ ...errors, imgError: "" })
      }
      imgArray.forEach((imgFile, fileIndex) => {
        countArray.push(imgFile.length);
        console.log("imgFile is ", imgFile)
        //   const file = imgFile[fileIndex];

        //   if (file) {
        for (let i = 0; i < imgFile.length; i++) {
          const file = imgFile[i];
          formData.append('img', file);
        }
        //   }
      });
      imgCount.push(countArray);
    });

    // Flatten the imgCount array to get a single array
    const flattenedImgCount = imgCount.reduce((acc, val) => acc.concat(val), []);
    formData.append('imgCount', JSON.stringify(flattenedImgCount));
   


      try {
        const response = await axios.post("http://3.86.47.176:3000/api/v1/floorplan", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Data submitted successfully!!")
      } catch (error) {
        toast.error("Something went wrong!")
      }
   
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      date: new Date(),
      address: '',
      remarks: '',
      mainImage: null,
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      {/* {
        console.log("values are ", formik.values)
      } */}
      <Nav />
      <Box style={{ backgroundColor: "#1f4888", display: "flex", justifyContent: "center" }}>
        <Box style={{ marginBottom: "20px", marginTop: "20px", padding: "20px", backgroundColor: "white", borderRadius: "10px" }}>
          <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <DialogTitle>Add New Location Options</DialogTitle>
            <DialogContent style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
              <TextField
                style={{ height: "60px" }}
                label="Write New Option"
                variant="outlined"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
              />
              <Button
                style={buttonStyle}
                onClick={() => {
                  // Add the newLocation to the options state
                  if (newLocation.trim() !== '') {
                    setOptions((options) => [
                      ...options,
                      { value: newLocation, label: newLocation },
                    ]);
                    setNewLocation(''); // Clear the input field
                  }
                }}
              >
                Add
              </Button>

            </DialogContent>
          </Dialog>

          <Box>
            <ToastContainer position="top-right" />
            {/* Same as */}
            <ToastContainer />
            <header className="headerWrapper">
              <Box>
                <img src={logoImg} />
                {/* <h2 style={{margin:"0pc", padding:"0px"}}>Add Property Information</h2> */}
              </Box>
              {/* <Box>
              <Box className="txtStyle">
                <p>
                  BUDDYFECTS PTE. LTD.
                  <br />
                  UEN: 202318717Z
                  <br />
                  1003 BUKIT MERAH
                  CENTRAL
                  #07-43
                  <br />
                  SINGAPORE (159836)
                </p>
              </Box>
            </Box> */}
            </header>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Box className="Mainwrapper">
              <Box className="TextfiledFlex">
                <Box>
                  <label
                    style={{
                      margin: "0px",
                      padding: "0px",
                      color: "#1f4879",
                      fontSize: "18px",
                    }}
                  >
                    Name
                  </label>
                  <TextField
                    placeholder="Write Name"

                    className="TextfieldStyle"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="error-message">{formik.errors.name}</div>
                  ) : null}
                </Box>
                <Box>
                  <label
                    style={{
                      margin: "0px",
                      padding: "0px",
                      color: "#1f4879",
                      fontSize: "18px",
                    }}
                  >
                    Date
                  </label>
                  <div style={{ display: "grid", width: "92%" }}>
                    <DatePicker
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      className="form-control"
                      id="date"
                      name="date"
                      selected={formik.values.date}
                      onChange={(date) =>
                        formik.setFieldValue("date", date)
                      }
                      dateFormat="yyyy-MM-dd"
                    />
                    {formik.touched.date && formik.errors.date ? (
                      <div className="error-message">{formik.errors.date}</div>
                    ) : null}
                  </div>

                </Box>

                <Box>
                  <label
                    style={{
                      margin: "0px",
                      padding: "0px",
                      color: "#1f4879",
                      fontSize: "18px",
                    }}
                  >
                    Address
                  </label>
                  <TextField
                    placeholder="Write Address"
                    id="address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="TextfieldStyle"
                    variant="outlined"
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <div className="error-message">{formik.errors.address}</div>
                  ) : null}
                </Box>
                <Box>
                  <label
                    style={{
                      margin: "0px",
                      padding: "0px",
                      color: "#1f4879",
                      fontSize: "18px",
                    }}
                  >
                    Remarks
                  </label>
                  <TextField
                    placeholder="Write Remarks"
                    id="remarks"
                    name="remarks"
                    value={formik.values.remarks}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="TextfieldStyle"
                    variant="outlined"
                  />
                  {formik.touched.remarks && formik.errors.remarks ? (
                    <div className="error-message">{formik.errors.remarks}</div>
                  ) : null}
                </Box>
                <Box gap={2} style={{ display: "flex", flexDirection: "column" }}>

                  <label
                    style={{
                      margin: "0px",
                      padding: "0px",
                      color: "#1f4879",
                      fontSize: "18px",
                    }}
                  >
                    Main Floor Image
                  </label>
                  <Box style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <input
                      type="file"
                      id="mainImage"
                      name="mainImage"
                      onChange={(event) => {
                        formik.setFieldValue('mainImage', event.currentTarget.files[0]);
                      }}
                      onBlur={formik.handleBlur}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="mainImage" className="upload-button">
                      <PhotoCameraIcon fontSize="large" color="primary" />
                    </label>
                    {formik.touched.mainImage && formik.errors.mainImage ? (
                      <div className="error-message">{formik.errors.mainImage}</div>
                    ) : null}
                    {formik.values.mainImage && (
                      <div>
                        <img style={{ height: "100px", width: "100px" }} src={URL.createObjectURL(formik.values.mainImage)} alt="Selected" />
                      </div>
                    )}
                  </Box>
                </Box>

                {count?.map((item, index) => (
                  <Destription
                    key={index}
                    location={location}
                    print={locationArr[index]}
                    // change={handleImgChange}
                    descChange={(e) => handleDescriptionChange(e, index)} // Pass the index
                    description={descriptionArr[index]} // Use the description at the specific index
                    index={index}
                    // imgFiles={imgFiles}
                    locationOptions={options}
                    updateLocationArr={(selectedLocation) => {
                      const updatedLocationArr = [...locationArr];
                      updatedLocationArr[index] = selectedLocation.value;
                      setLocationArr(updatedLocationArr);
                    }}

                    updateImgArr={(destIndex, imgFiles) => {
                      const updatedMainImgArr = [...mainImgArr];
                      updatedMainImgArr[destIndex] = imgFiles;
                      setMainImgArr(updatedMainImgArr);
                    }}
                    error={errors}

                  />
                ))}
                <Box className="btnFlex">
                  <Button
                    onClick={() => {
                      setCount([...count, 1]);
                      setLocationArr([...locationArr, location.value]);

                      // setDescriptionArr([...descriptionArr, description]);
                    }}
                    color="primary"
                    style={buttonStyle}
                  >
                    <AddIcon />
                  </Button>
                  <Button
                    style={buttonStyle}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Add Location
                  </Button>
                  <Box>
                    <Button
                      style={buttonStyleSubmit}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>

    </>
  );
};

const Destription = (props) => {

  const [selectedLocation, setSelectedLocation] = useState(props.locationOptions[0]); // Initialize with the first location option
  const [imgFiles, setImgFiles] = useState([]); // Store multiple image files for this iteration

  const handleImgChange = (e) => {
    const selectedFiles = e.target.files;
    setImgFiles([...imgFiles, selectedFiles]);
  };

  useEffect(() => {
    props.updateImgArr(props.index, imgFiles); // Update the parent component's mainImgArr
  }, [imgFiles]);
  return (

    <Box className="Flexdiscrip">
      <p style={{color:"red"}}>{props.error.imgError}</p>
      <label htmlFor={`image-input-${props.index}`} className="upload-button-small">
        <input
          type="file"
          accept="image/*"
          multiple
          id={`image-input-${props.index}`}
          onChange={handleImgChange}
          style={{ display: "none" }}
        />
        <PhotoCameraIcon fontSize="small" color="primary" />
      </label>
      <Box className="location-label">
        <div>
          <label className="location-label">
            Location
          </label>
          <Select
          
            options={props.locationOptions}
            value={selectedLocation}
            onChange={(selectedOption) => {
              setSelectedLocation(selectedOption);
              props.updateLocationArr(selectedOption); // Update locationArr in the parent
            }}
          />
        </div>
      </Box>
      <Box>
        <Box className="Descriptionflex">
          <Box>
            <label className="description-label">
              Description
            </label>
            <TextField
              placeholder="Write Description"
              multiline
              // rows={2}
              className="TextfieldStyle-small"
              id={`outlined-basic-${props.index}`}
              variant="outlined"
              value={props.description}
              onChange={(e) => props.descChange(e, props.index)}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
};

export default Floorplanlayout;
