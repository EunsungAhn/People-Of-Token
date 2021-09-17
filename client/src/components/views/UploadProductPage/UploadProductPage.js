// import React, { useState } from "react";
// // import { Typography, Button, Form, Input } from "antd";
// import { Button, Form, Input } from "antd";
// import FileUpload from "../../utils/FileUpload";
// import axios from "axios";

// // const { Title } = Typography;
// const { TextArea } = Input;

// const Continents = [
//   { key: 1, value: "Africa" },
//   { key: 2, value: "Europe" },
//   { key: 3, value: "Asia" },
//   { key: 4, value: "North America" },
//   { key: 5, value: "South America" },
//   { key: 6, value: "Australia" },
//   { key: 7, value: "Antarctica" },
// ];

// function UploadProductPage(props) {
//   const [Title, setTitle] = useState("");
//   const [Description, setDescription] = useState("");
//   const [Price, setPrice] = useState(0);
//   const [Continent, setContinent] = useState(1);
//   const [Images, setImages] = useState([]);

//   const titleChangeHandler = (event) => {
//     setTitle(event.currentTarget.value);
//   };

//   const descriptionChangeHandler = (event) => {
//     setDescription(event.currentTarget.value);
//   };

//   const priceChangeHandler = (event) => {
//     setPrice(event.currentTarget.value);
//   };

//   const continentChangeHandler = (event) => {
//     setContinent(event.currentTarget.value);
//   };

//   // const imagesChangeHandler = (event) => {
//   //   setImages(event.currentTarget.value);
//   // };

//   const updateImages = (newImages) => {
//     setImages(newImages);
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();

//     if (!Title || !Description || !Price || !Continent || !Images) {
//       return alert("모든 값을 넣어주셔야 합니다.");
//     }

//     // 서버에 채운 값들을 request로 보낸다.
//     const body = {
//       // 로그인 된 사람의 ID
//       writer: props.user.userData._id,
//       title: Title,
//       description: Description,
//       price: Price,
//       images: Images,
//       continents: Continent,
//     };

//     axios.post("/api/product", body).then((response) => {
//       if (response.data.success) {
//         alert("상품 업로드에 성공했습니다.");
//         props.history.push("/");
//       } else {
//         alert("상품 업로드에 실패했습니다.");
//       }
//     });
//   };

//   return (
//     <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
//       <div style={{ textAlign: "center", marginBottom: "2rem" }}>
//         {/* <Title level={2}>여행 상품 업로드</Title> */}
//         <h2>여행 상품 업로드</h2>
//       </div>

//       <Form onSubmit={submitHandler}>
//         {/* DropZone */}
//         <FileUpload refreshFunction={updateImages} />

//         <br />
//         <br />
//         <label>이름</label>
//         <Input onChange={titleChangeHandler} value={Title} />
//         <br />
//         <br />
//         <label>설명</label>
//         <TextArea onChange={descriptionChangeHandler} value={Description} />
//         <br />
//         <br />
//         <label>가격($)</label>
//         <Input type="number" onChange={priceChangeHandler} value={Price} />
//         <br />
//         <br />
//         <select onChange={continentChangeHandler} value={Continent}>
//           {Continents.map((item) => (
//             <option key={item.key} value={item.key}>
//               {item.value}
//             </option>
//           ))}
//         </select>
//         <br />
//         <br />
//         <Button type="submit" onClick={submitHandler}>
//           확인
//         </Button>
//       </Form>
//     </div>
//   );
// }

// export default UploadProductPage;

// *** (1) ***

// import React, { Component } from "react";
// import PropTypes from "prop-types";

// import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
// import { FilePond, registerPlugin } from "react-filepond";

// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
// import "filepond/dist/filepond.min.css";

// import logo from "./ipfs-logo.png";
// import ipfs from "../../utils/ipfs";
// import "../../css/filepond-custom.css";
// import "../../css/bootstrap/css/bootstrap.min.css";
// import "../../App.css";
// import MetaUpload from "./MetaUpload";

// class UploadProductPage extends Component {
//   state = {
//     ipfsHash: null,
//     ipfsMetaHash: null,
//     buffer: "",
//     files: [],
//     imageUrl: null,
//     flag: false,
//   };

//   constructor(props, context) {
//     super(props);
//     this.deedIpfsToken = context.drizzle.contracts.DeedIPFSToken;

//     registerPlugin(FilePondPluginImagePreview);
//   }

//   componentDidMount() {
//     document.addEventListener("FilePond:addfile", this.readFile);
//   }

//   readFile = () => {
//     //console.log(file.detail.file.filename);
//     //console.log(this.pond.props.children[0].props.src);
//     if (this.pond != null) {
//       const file = this.pond.props.children[0].props.src; // single file

//       let reader = new window.FileReader();
//       reader.readAsArrayBuffer(file);
//       reader.onloadend = () => this.fileToBuffer(reader);
//     }
//   };

//   fileToBuffer = async (reader) => {
//     //buffering ready to upload to IPFS
//     const buffer = await Buffer.from(reader.result);
//     this.setState({ buffer });
//   };

//   handleUpload = async () => {
//     if (this.state.files.length > 0) {
//       this.setState({ ipfsHash: "Uploading..." });

//       await ipfs.add(this.state.buffer, (err, ipfsHash) => {
//         //console.log(err, ipfsHash);
//         //setState by setting ipfsHash to ipfsHash[0].hash
//         this.setState({ ipfsHash: ipfsHash[0].hash }, () =>
//           console.log("Hash=" + this.state.ipfsHash)
//         );
//       });
//     }
//   };

//   handleMint = () => {
//     if (this.state.ipfsMetaHash !== null) {
//       this.deedIpfsToken.methods.mint.cacheSend(this.state.ipfsMetaHash);
//     }
//   };

//   handleReset = () => {
//     this.setState({
//       ipfsMetaHash: null,
//       imageUrl: null,
//       flag: false,
//     });

//     this.pond.removeFile();
//   };

//   handleIpfsMetaHash = (ipfsMetaHash) => {
//     this.setState({ ipfsMetaHash: ipfsMetaHash });
//   };

//   render() {
//     return (
//       <div className="container">
//         <div style={{ textAlign: "center" }}>
//           <img src={logo} alt="ipfs-logo" width={70} height={70} />
//           <h1>IPFS Image Upload</h1>
//           <br />
//           <br />
//         </div>
//         <div>
//           <FilePond
//             ref={(ref) => (this.pond = ref)}
//             onupdatefiles={(fileItems) => {
//               // Set current file objects to this.state
//               this.setState({
//                 files: fileItems.map((fileItem) => fileItem.file),
//               });
//             }}
//           >
//             {this.state.files.map((file) => (
//               <input type="file" key={file} src={file} />
//             ))}
//           </FilePond>
//         </div>
//         <div>
//           {this.state.imageUrl && (
//             <img
//               src={this.state.imageUrl}
//               className="img-view"
//               alt="ipfs-image"
//             />
//           )}{" "}
//           {this.state.ipfsHash}
//         </div>
//         <div style={{ marginTop: "10px" }}>
//           <ButtonToolbar>
//             <ButtonGroup justified>
//               <Button href="#" bsStyle="primary" onClick={this.handleUpload}>
//                 Upload
//               </Button>
//             </ButtonGroup>
//           </ButtonToolbar>
//         </div>
//         {/* ERC721 토큰의 메타 정보에 해당하는 JSON 파일을 IPFS에 업로드 */}
//         <MetaUpload
//           onChangeIpfsMetaHash={this.handleIpfsMetaHash}
//           ipfsMetaHash={this.state.ipfsMetaHash}
//         />
//         <div>
//           <Button href="#" bsStyle="primary" onClick={this.handleMint}>
//             Mint
//           </Button>{" "}
//           <Button href="#" onClick={this.handleReset}>
//             Reset
//           </Button>
//         </div>
//       </div>
//     );
//   }
// }

// UploadProductPage.contextTypes = {
//   drizzle: PropTypes.object,
// };

// export default UploadProductPage;

// *** (2) ***

// import React, { Component, useState } from "react";
// import PropTypes from "prop-types";

// import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
// import { FilePond, registerPlugin } from "react-filepond";

// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
// import "filepond/dist/filepond.min.css";

// import logo from "./ipfs-logo.png";
// import ipfs from "../../utils/ipfs";
// import "../../css/filepond-custom.css";
// import "../../css/bootstrap/css/bootstrap.min.css";
// import "../../App.css";
// import MetaUpload from "./MetaUpload";

// function UploadProductPage(props) {
//   // const state = {
//   //   ipfsHash: null,
//   //   ipfsMetaHash: null,
//   //   buffer: "",
//   //   files: [],
//   //   imageUrl: null,
//   //   flag: false,
//   // };
//   let pond = FilePond.create();

//   const [IpfsHash, setIpfsHash] = useState(null);
//   const [IpfsMetaHash, setIpfsMetaHash] = useState(null);
//   const [Buffer, setBuffer] = useState("");
//   const [Files, setFiles] = useState([]);
//   const [ImageUrl, setImageUrl] = useState(null);
//   const [Flag, setFlag] = useState(false);

//   // const deedIpfsToken = context.drizzle.contracts.DeedIPFSToken;
//   // const deedIpfsToken = context.drizzle.contracts.DeedIPFSToken;
//   registerPlugin(FilePondPluginImagePreview);

//   const componentDidMount = () => {
//     document.addEventListener("FilePond:addfile", readFile);
//   };

//   const readFile = () => {
//     //console.log(file.detail.file.filename);
//     //console.log(this.pond.props.children[0].props.src);
//     if (pond != null) {
//       const file = pond.props.children[0].props.src; // single file

//       let reader = new window.FileReader();
//       reader.readAsArrayBuffer(file);
//       reader.onloadend = () => fileToBuffer(reader);
//     }
//   };

//   const fileToBuffer = async (reader) => {
//     //buffering ready to upload to IPFS
//     const buffer = await Buffer.from(reader.result);
//     setBuffer(buffer);
//   };

//   const handleUpload = async () => {
//     if (Files.length > 0) {
//       setIpfsHash("Uploading...");

//       await ipfs.add(Buffer, (err, IpfsHash) => {
//         //console.log(err, ipfsHash);
//         //setState by setting ipfsHash to ipfsHash[0].hash
//         setIpfsHash(IpfsHash[0].hash, () => console.log("Hash=" + IpfsHash));
//       });
//     }
//   };

//   const handleMint = () => {
//     if (IpfsMetaHash !== null) {
//       // deedIpfsToken.methods.mint.cacheSend(IpfsMetaHash);
//     }
//   };

//   const handleReset = () => {
//     // setState({
//     //   ipfsMetaHash: null,
//     //   imageUrl: null,
//     //   flag: false,
//     // });

//     setIpfsMetaHash(null);
//     setImageUrl(null);
//     setFlag(false);

//     pond.removeFile();
//   };

//   const handleIpfsMetaHash = (ipfsMetaHash) => {
//     setIpfsMetaHash(ipfsMetaHash);
//   };

//   return (
//     <div className="container">
//       <div style={{ textAlign: "center" }}>
//         <img src={logo} alt="ipfs-logo" width={70} height={70} />
//         <h1>IPFS Image Upload</h1>
//         <br />
//         <br />
//       </div>
//       <div>
//         <FilePond
//           ref={(ref) => (pond = ref)}
//           onupdatefiles={(fileItems) => {
//             // Set current file objects to this.state
//             // setState({
//             //   files: fileItems.map((fileItem) => fileItem.file),
//             // });
//           }}
//         >
//           {Files.map((file) => (
//             <input type="file" key={file} src={file} />
//           ))}
//         </FilePond>
//       </div>
//       {/* <div>
//         {this.state.imageUrl && (
//           <img
//             src={this.state.imageUrl}
//             className="img-view"
//             alt="ipfs-image"
//           />
//         )}{" "}
//         {this.state.ipfsHash}
//       </div> */}
//       <div style={{ marginTop: "10px" }}>
//         <ButtonToolbar>
//           <ButtonGroup justified>
//             <Button href="#" bsStyle="primary" onClick={handleUpload}>
//               Upload
//             </Button>
//           </ButtonGroup>
//         </ButtonToolbar>
//       </div>
//       {/* ERC721 토큰의 메타 정보에 해당하는 JSON 파일을 IPFS에 업로드 */}
//       <MetaUpload
//         onChangeIpfsMetaHash={handleIpfsMetaHash}
//         ipfsMetaHash={IpfsMetaHash}
//       />
//       <div>
//         <Button href="#" bsStyle="primary" onClick={handleMint}>
//           Mint
//         </Button>{" "}
//         <Button href="#" onClick={handleReset}>
//           Reset
//         </Button>
//       </div>
//     </div>
//   );
// }

// UploadProductPage.contextTypes = {
//   drizzle: PropTypes.object,
// };

// export default UploadProductPage;

// ************************ (3) ************************
// ************************ (3) ************************
// ************************ (3) ************************

import React, { Component, useState } from "react";
import PropTypes from "prop-types";

import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { FilePond, registerPlugin } from "react-filepond";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "filepond/dist/filepond.min.css";

import logo from "./ipfs-logo.png";
import ipfs from "../../utils/ipfs";
import "../../css/filepond-custom.css";
import "../../css/bootstrap/css/bootstrap.min.css";
import "../../App.css";
import MetaUpload from "./MetaUpload";

function UploadProductPage(props) {
  return (
    <div className="container">
      <div style={{ textAlign: "center" }}>
        <img src={logo} alt="ipfs-logo" width={70} height={70} />
        <h1>IPFS Image Upload</h1>
        <br />
        <br />
      </div>
      {/* <div>
        <FilePond
          ref={(ref) => (pond = ref)}
          onupdatefiles={(fileItems) => {
            // Set current file objects to this.state
            // setState({
            //   files: fileItems.map((fileItem) => fileItem.file),
            // });
          }}
        >
          {Files.map((file) => (
            <input type="file" key={file} src={file} />
          ))}
        </FilePond>
      </div> */}
      {/* <div>
        {this.state.imageUrl && (
          <img
            src={this.state.imageUrl}
            className="img-view"
            alt="ipfs-image"
          />
        )}{" "}
        {this.state.ipfsHash}
      </div> */}
      {/* <div style={{ marginTop: "10px" }}>
        <ButtonToolbar>
          <ButtonGroup justified>
            <Button href="#" bsStyle="primary" onClick={handleUpload}>
              Upload
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div> */}
      {/* ERC721 토큰의 메타 정보에 해당하는 JSON 파일을 IPFS에 업로드 */}
      {/* <MetaUpload /> */}
      <div>
        {/* <Button bsStyle="primary">Mint</Button>
        <Button>Reset</Button> */}
        <button>Mint</button>
      </div>
    </div>
  );
}

export default UploadProductPage;
