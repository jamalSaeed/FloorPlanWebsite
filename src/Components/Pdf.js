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

const styles = StyleSheet.create({
    page: {
        color: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 30,
    },
    image: {
        width: 500,
        height: 300,
    },
    section: {
        margin: 10,
        padding: 10,
    },
    viewer: {
        width: window.innerWidth,
        height: window.innerHeight,
    },
    tableContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: 10,
        padding: 7
    },
    tableRow: {
        border: "1px solid #000",
        borderRadius: "5px",
        flexDirection: "row",
        margin: "0px",
    },
    tableCell: {
        width: "24%",
        padding: 7,
        marginBottom: 5,
        fontSize: 12,
        height: "50px",

        textAlign: "justify"
    },
    tableCellUpper: {

       flex:1,
        width: "25%",
        padding: 7,
        marginBottom: 5,
        fontSize: 12,
    },

    headerCell: {
        backgroundColor: "#ccc",
        fontWeight: "bold",
        padding: 7,
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
    },
    innerImage: {
        height: "100px",
        width: "100px",
        borderRadius: "10px"
    },
    pageBreak: {
        flexBasis: "100%",
        height: 0,
    },
    breakable: { width: '100%', height: 400, },
});

function Pdf(props) {
    console.log(props)




    return (
        <PDFViewer style={styles.viewer}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <Text style={styles.header}>PDF Report</Text>
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
                    <Image style={styles.image} src={`http://54.226.145.28:3000/public/image/users/${props.data?.mainImage}`} />
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


                                <Text style={styles.tableCellUpper}>
                                    {finding?.description}
                                </Text>

                                <View>
                                    <Image
                                        style={[styles.tableCell, styles.innerImage]}
                                        src={`http://54.226.145.28:3000/public/image/users/${finding?.img}`}
                                    />
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
