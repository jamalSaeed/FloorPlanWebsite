import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { Tooltip } from '@mui/material';
import Pdf from './Pdf';
import Nav from './Nav/Nav';
import { apiConfig } from '../url';

export default function Table() {


  const [showPDF, setShowPDF] = useState(false);

  const handleShowPDF = (id) => {

    const foundElement = floorData.find((item) => item._id === id);
    console.log("data is", foundElement)
setCurrData(foundElement)
    setShowPDF(true);
  };

  const [floorData, setFloorData] = useState([])
  const [currData, setCurrData] = useState()


  const columns = [
    {
      field: "id",
      headerName: "ID",

      width: 90,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 180,
      editable: true,
    },
    {
      field: 'mainImage', // Change 'image' to the field name where your image URL is stored
      headerName: 'Image',
      width: 120,

      renderCell: (params) => {
        return (
          <img
          src={`${apiConfig.url}/public/image/users/${params.row.mainImage}`}
            alt="Image"
            style={{ borderRadius: "5px", width: '80px', height: '50px' }}
          />
        );
      },
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 240,
      editable: true,
      renderCell: (params) => {
        return (
          <div>

            <Tooltip placement='top' title={params.row.address} >{params.row.address}</Tooltip>
          </div>
        )
      }
    },
    {
      field: 'remarks',
      headerName: 'Remarks',
      width: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <div>

            <Tooltip placement='top' title={params.row.remarks} >{params.row.remarks}</Tooltip>
          </div>
        )
      }
    },
    {
      field: 'floorDetails',
      headerName: 'Location(s)',
      width: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <div>
            {
              params.row.floorDetails.map((item, index) => (
                <div key={index}>
                  <Tooltip placement='top' key={index} title={params.row.floorDetails[index].location} >{params.row.floorDetails[index].location}</Tooltip>
                  <br></br>
                </div>
              ))

            }
          </div>
        )
      }
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 170,
      editable: true,
      valueGetter: (params) => {
        const isoDate = params.row.date; // Assuming your API date field is 'date'
        const date = new Date(isoDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },

    },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <button
          onClick={() =>{
            // console.log(params.api.getRowId(params.row))
            handleShowPDF(params.api.getRowId(params.row))
          } 
        }
        >
          View PDF
        </button>
      ),
    },

  ];




  const getFloorDetails = async () => {
    await axios
      .get(`${apiConfig.url}/api/v1/floorplan`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("floor are ", res)
        setFloorData(res.data.data.floorPlan);
      })
      .catch((err) => {
        console.log("Get Fllor Api Error ", err);
      });
  };


  useEffect(() => {
    getFloorDetails();
  }, []);

  return (
    <>
    <Nav />
      {floorData.length !== 0 ?

        <Box sx={{ height: '90%', width: '100%' }}>
          <DataGrid
            slots={{ toolbar: GridToolbar }}
            rows={floorData.map((item,index)=>{return {id:index+1,...item}})}
            getRowId={(row) => row._id}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            // checkboxSelection
            disableRowSelectionOnClick
          />

        </Box>
        : <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#7393B3" }}>
          <h1 >No data to view</h1>
        </Box>
      }

      {showPDF && <Pdf data={currData} />}
    </>

  );
}