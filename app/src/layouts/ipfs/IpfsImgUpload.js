import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap';
import {FilePond, registerPlugin } from 'react-filepond';

import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';

import logo from './ipfs-logo.png';
import ipfs from '../../utils/ipfs';
import '../../css/filepond-custom.css';
import '../../css/bootstrap/css/bootstrap.min.css';
import '../../App.css';
import MetaUpload from "./MetaUpload";

class IpfsImgUpload extends Component {

    state = {
        ipfsHash: null,
        ipfsMetaHash: null,
        buffer: '',
        files: [],
        imageUrl: null,
        flag: false
    };

    constructor(props, context) {
        super(props);
        this.deedIpfsToken = context.drizzle.contracts.DeedIPFSToken;
        
        registerPlugin(FilePondPluginImagePreview);
    }

    componentDidMount() {
        document.addEventListener("FilePond:addfile", this.readFile);
    }


    readFile = () => {

        //console.log(file.detail.file.filename);
        //console.log(this.pond.props.children[0].props.src);
        if (this.pond != null) {

            const file = this.pond.props.children[0].props.src; // single file

            let reader = new window.FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = () => this.fileToBuffer(reader);
        }
    };

    fileToBuffer = async (reader) => {
        //buffering ready to upload to IPFS
        const buffer = await Buffer.from(reader.result);
        this.setState({buffer});
    }


    handleUpload = async () => {

        if (this.state.files.length > 0) {
            
            this.setState({ ipfsHash: 'Uploading...'});
            
            await ipfs.add(this.state.buffer, (err, ipfsHash) => {
                //console.log(err, ipfsHash);
                //setState by setting ipfsHash to ipfsHash[0].hash
                this.setState({ ipfsHash:ipfsHash[0].hash }, ()=>console.log("Hash=" + this.state.ipfsHash));
            });
        }
    }
    
    handleMint = () => {
        if (this.state.ipfsMetaHash !== null) {
            this.deedIpfsToken.methods.mint.cacheSend(this.state.ipfsMetaHash);
        }
    }

    
    handleReset = () => {
        this.setState({
            ipfsMetaHash: null,
            imageUrl: null,
            flag: false
        });
        
        this.pond.removeFile();
    }
    
    handleIpfsMetaHash = (ipfsMetaHash) => {
        this.setState({ipfsMetaHash: ipfsMetaHash});
    }
    
    render() {
        return (
            <div className="container">
                <div style={{textAlign: 'center'}}>
                    <img src={logo} alt="ipfs-logo" width={70} height={70}/>
                    <h1>IPFS Image Upload</h1>
                    <br/><br/>
                </div>
                <div>
                    <FilePond ref={ref => this.pond = ref}
                              onupdatefiles={(fileItems) => {
                                  // Set current file objects to this.state
                                  this.setState({
                                      files: fileItems.map(fileItem => fileItem.file)
                                  });
                              }}>
                        {this.state.files.map(file => (
                            <input type="file" key={file} src={file} />
                        ))}
                    </FilePond>
                </div>
                <div>
                    {this.state.imageUrl && <img src={this.state.imageUrl} className="img-view" alt="ipfs-image" />} {this.state.ipfsHash}
                </div>
                <div style={{marginTop:"10px"}}>
                    <ButtonToolbar>
                        <ButtonGroup justified>
                            <Button href="#" bsStyle="primary" onClick={this.handleUpload}>
                                Upload
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
                {/* ERC721 토큰의 메타 정보에 해당하는 JSON 파일을 IPFS에 업로드 */}
                <MetaUpload onChangeIpfsMetaHash={this.handleIpfsMetaHash} ipfsMetaHash={this.state.ipfsMetaHash}/>
                <div>
                    <Button href="#" bsStyle="primary" onClick={this.handleMint}>
                        Mint
                    </Button>{' '}
                    <Button href="#" onClick={this.handleReset}>
                        Reset
                    </Button>
                </div>
            </div>
        )
    }
}


IpfsImgUpload.contextTypes = {
    drizzle: PropTypes.object
}

export default IpfsImgUpload
