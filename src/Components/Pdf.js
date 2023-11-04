import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image,
} from "@react-pdf/renderer";

import logo from "../Images/logo.png"

const styles = StyleSheet.create({
    page: {
        color: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 30,
    },

    tableContainer: {
        display: "flex",
        flexDirection: "column",
        width: "80%",
        // margin: 10,
        // padding: 7
    },
    tableRow: {
        borderTop: "1px solid #000", // Add a border to the table rows
        borderRight: "1px solid #000", // Add a border to the table rows
        borderLeft: "1px solid #000", // Add a border to the table rows
        borderBottom: "1px solid #000", // Add a border to the table rows
        // borderRadius: "1px",
        flexDirection: "row",
        margin: "0px",
    },
    tableCell: {
        width: '27%',
        height: "100%",
        paddingTop: 7,
        paddingLeft: 2,
        // marginBottom: 5,
        fontSize: 12,
        // height: "50px",
        textAlign: "center",
        borderRight: "1px solid #000", // Add a right border to the table cells
    },
    tableCellUpper: {
        flex: 1,
        width: "25%",
        padding: 7,
        // marginBottom: 5,
        fontSize: 12,
        borderRight: "1px solid #000", // Add a right border to the table cells

    },
    headerCell: {
        backgroundColor: "#ccc",
        fontWeight: "bold",

    },
    image: {
        marginTop: "20px",
        width: 426,
        height: 300,
        borderRadius: "5px"
    },
    section: {
        margin: 10,
        padding: 10,
    },
    viewer: {
        width: window.innerWidth,
        height: window.innerHeight,
    },

    text: {
        fontSize: 12,
    },
    imageContainer: {
        width: "100%",
    },
    header: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        textDecoration: "underline",
    },
    innerImage: {
        height: "100px",
        width: "100px",
        borderRadius: "2px",
        margin: "8px",
    },
    pageBreak: {
        flexBasis: "100%",
        height: 0,
    },
    address: {
        fontSize: 10,
        fontWeight: "bold",

    },
});

function Pdf(props) {
    console.log(props)
    return (
        <PDFViewer style={styles.viewer}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={{ width: "90%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }} >
                        <Image style={{ height: "100px", width: "120px" }} src={logo} />
                        <Text style={styles.header}>Defects Report</Text>
                        <View style={styles.address}>
                            <Text>BUDDYFECTS PTE. LTD.</Text>
                            <Text>UEN: 202318717Z</Text>
                            <Text>1003 BUKIT MERAH</Text>
                            <Text>CENTRAL</Text>
                            <Text>#07-43</Text>
                            <Text>SINGAPORE (159836)</Text>
                        </View>
                    </View>
                    <View style={styles.tableContainer}>
                        <View style={[styles.tableRow, styles.headerCell]}>
                            <Text style={styles.tableCellUpper}>Name</Text>
                            <Text style={styles.tableCellUpper}>{props.data?.name}</Text>
                        </View>

                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellUpper}>Address</Text>
                            <Text style={styles.tableCellUpper}>{props.data?.address}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellUpper}>Remarks</Text>
                            <Text style={styles.tableCellUpper}>{props.data?.remarks}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellUpper}>Date</Text>
                            <Text style={styles.tableCellUpper}> {props.data.date
                                ? new Date(props.data.date).toISOString().split("T")[0]
                                : ""}</Text>
                        </View>
                    </View>
                    <Image style={styles.image} src={`http://3.86.47.176:3000/public/image/users/${props.data?.mainImage}`} />
                </Page>

                {/* Start a new page */}
                <Page wrap={false} size="A4" style={styles.page}>
                    <Text style={styles.header}>Inspection Findings Table</Text>
                    <View style={styles.tableContainer}>
                        <View style={[styles.tableRow, styles.headerCell]}>
                            <Text style={styles.tableCell}>S/N</Text>
                            <Text style={styles.tableCell}>Location</Text>
                            <Text style={styles.tableCell}>Description</Text>
                            <Text style={styles.tableCell}>Photo</Text>
                        </View>
                        {props.data?.floorDetails?.map((finding, index) => (
                            <View wrap style={styles.tableRow} key={index}>
                                <Text style={styles.tableCell}>{index}</Text>

                                <Text style={styles.tableCell}>{finding?.location}</Text>


                                <Text style={styles.tableCell}>
                                    {finding?.description}
                                </Text>
                                <View style={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", alignItems: "center", width: "auto" }}>
                                    {finding?.img?.map((item, index) => (

                                        <Image
                                        key={index}
                                            style={styles.innerImage}
                                            src={`http://3.86.47.176:3000/public/image/users/${item}`}
                                        />
                                    ))

                                    }
                                </View>

                            </View>
                        ))}
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
}

export default Pdf;
