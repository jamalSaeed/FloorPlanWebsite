import React, { useState } from "react";
import "./Floorplanlayout.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import logoImg from "../../src/Images/logo33-removebg-preview.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Nav from "../Components/Nav/Nav";




const Floorplanlayout = () => {
  const options = [
    { value: "Main door", label: "Main door" },
    { value: "Living Room", label: "Living Room" },
    { value: "Bed room", label: "Bed room" },
    { value: "Bath", label: "Bath" },
    { value: "Kitchen", label: "Kitchen" },
    { value: "Yard", label: "Yard" },
  ];
  const [count, setCount] = useState([1]);

  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [address, setAddress] = useState("");
  const [remarks, setRemarks] = useState("");


  // const [description, setDescription] = useState("");
  const [descriptionArr, setDescriptionArr] = useState([""]);



  const [location, setLocation] = useState("");
  const [locationArr, setLocationArr] = useState([]);

  const [mainImageFile, setMainImageFile] = useState();


  const [imgFiles, setImgFiles] = useState([]);
  // const [imgArr, setImgArr] = useState([]);





  const buttonStyle = {
    color: "#1f4879",
    borderRadius: "10px",
    border: "2px solid #1f4879",
  };
  const buttonStyleSubmit = {
    color: "#1f4879",
    borderRadius: "10px",
    border: "2px solid #1f4879",
    textTransform: "none",
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted with data:", { name, date, address, remarks });
  // };

  const handleMainImageChange = (e) => {
    setMainImageFile(e.target.files[0]);
  };


  const handleImgChange = (e, index) => {
    const selectedFiles = e.target.files[0];
    const updatedImgFiles = [...imgFiles];
    updatedImgFiles[index] = selectedFiles;
    setImgFiles(updatedImgFiles);
  };

  const handleDescriptionChange = (e, index) => {
    const updatedDescriptionArr = [...descriptionArr];

    // Ensure the updated value is assigned to the correct index in the array
    updatedDescriptionArr[index] = e.target.value;

    // Update the state with the modified array
    setDescriptionArr(updatedDescriptionArr);
  };




  // const handlePDFExport = () => {
  //   // Create a new jsPDF instance
  //   const doc = new jsPDF();

  //   // Define the data you want to include in the PDF
  //   const data = [
  //     ["Name", name],
  //     ["Date", date.toDateString()],
  //     ["Address", address],
  //     ["Remarks", remarks],
  //   ];

  //   // Create a table to display the data
  //   doc.autoTable({
  //     head: [["Field", "Value"]],
  //     body: data,
  //   });

  //   // Add the main image to the PDF (assuming mainImageFile is a valid image file)
  //   if (mainImageFile) {
  //     doc.addImage(mainImageFile, "JPEG", 10, 80, 90, 60);
  //   }

  //   // Iterate through descriptions and locations and add them to the table
  //   for (let i = 0; i < descriptionArr.length; i++) {
  //     data.push([`Description ${i + 1}`, descriptionArr[i]]);
  //     data.push(["Location", locationArr[i]]);
  //   }

  //   // Add the data table to the PDF
  //   doc.autoTable({
  //     head: [["Field", "Value"]],
  //     body: data,
  //     startY: 150,
  //   });

  //   // Save or display the PDF
  //   doc.save("floorplan.pdf");
  // };

  const handleSubmit = async (e) => {

    e.preventDefault()
    console.log("imgfiles are", imgFiles)
    const filteredDescriptionArr = descriptionArr.filter((desc) => desc.trim() !== "");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("remarks", remarks);
    formData.append("date", date);
    // formData.append("remarks", location);

    if (mainImageFile) {
      formData.append("mainImage", mainImageFile);
    } else {
      formData.append("mainImage", "");
    }



    for (const selectedOption of locationArr) {
      formData.append("location", selectedOption);
    }

    for (const desc of filteredDescriptionArr) {
      formData.append("description", desc);
    }


    for (const img of imgFiles) {
      if (img) {
        formData.append("img", img);
      } else {
        formData.append("img", ""); // You may want to handle this differently
      }
    }
    console.log("Form Data Content:");

    for (const pair of formData.entries()) {
      const [key, value] = pair;
      if (value instanceof File) {
        console.log(key + ": [File]");
      } else {
        console.log(key + ": " + value);
      }
    }

    // handlePDFExport()

    try {
      const response = await axios.post("http://54.226.145.28:3000/api/v1/floorplan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response from the server:", response.data);
      // generatePDF();
      toast.success("Data submitted successfully!!")
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!")
    }
  };

  return (
    <>
    <Nav />
      <Box style={{ marginBottom: "20px", padding: "0px" }}>

        <Box>
          <ToastContainer position="top-right" />
          {/* Same as */}
          <ToastContainer />
          <header className="headerWrapper">
            <Box>
              <img src={logoImg} />
            </Box>
            <Box>
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
            </Box>
          </header>
        </Box>
        <form onSubmit={handleSubmit}>
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
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="TextfieldStyle"
                  id="outlined-basic"
                  variant="outlined"
                />
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
                    selected={date}
                    onChange={(date) =>
                      setDate(date)
                    }
                    dateFormat="yyyy-MM-dd"
                  />
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

                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  className="TextfieldStyle"
                  id="outlined-basic"
                  variant="outlined"
                />
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

                  value={remarks}
                  onChange={(e) => {
                    setRemarks(e.target.value);
                  }}
                  className="TextfieldStyle"
                  id="outlined-basic"
                  variant="outlined"
                />
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
                    accept="image/*"
                    onChange={handleMainImageChange}
                  />
                  {mainImageFile && (
                    <div>
                      <img style={{ height: "100px", width: "100px" }} src={URL.createObjectURL(mainImageFile)} alt="Selected" />
                    </div>
                  )}
                </Box>
              </Box>
              <Box>
                <div>
                  <label className="locTxt">Location</label>
                </div>
                <Select
                  options={options}
                  value={location}
                  onChange={(selectedOptions) => {
                    setLocation(selectedOptions);
                    // setLocationArr((locationArr) => [...locationArr, selectedOptions.value]);
                  }}
                />
              </Box>
              {count?.map((item, index) => (
                <Destription
                  key={index}
                  location={location}
                  print={locationArr[index]}
                  change={handleImgChange}
                  descChange={(e) => handleDescriptionChange(e, index)} // Pass the index
                  description={descriptionArr[index]} // Use the description at the specific index
                  index={index} />
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
                <Box>
                  <Button
                    style={buttonStyleSubmit}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>

    </>
  );
};

const Destription = (props) => {
  return (
    <Box className="Flexdiscrip">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => props.change(e, props.index)} // Pass the index
      />
      {props.print &&

      <Box style={{backgroundColor:"#1f4879", color:"white", borderRadius:"5px", padding:"3px", minWidth:"70px", textAlign:"center"}}>

      <p>{props.print}</p>
      </Box>
      }

      <Box>
        <Box className="Descriptionflex">
          <Box>
            <label
              style={{
                padding: "0px",
                color: "#1f4879",
                fontSize: "18px",
              }}
            >
              Description
            </label>
            <TextField
              placeholder="Write Description"
              multiline
              rows={2}
              className="TextfieldStyle"
              id={`outlined-basic-${props.index}`} // Use an identifier that includes the index
              variant="outlined"
              value={props.description}
              onChange={(e) => props.descChange(e, props.index)} // Pass the index
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Floorplanlayout;
