import React from "react";
import { Button, ButtonGroup, ButtonToolbar, Col, ControlLabel, Form, FormControl, FormGroup } from "react-bootstrap";
import Loader from "react-loader-spinner";
import ipfs from "../../utils/ipfs";
import { IPFS_URL } from "../../utils/constants";

export default class MetaUpload extends React.Component {
    
    state = {
        flag: false
    };
    
    
    handleUploadJson = async () => {
        
        const name = this.metaName.value;
        const trait = this.metaTrait.value;
        const desc = this.metaDesc.value;
        const hash = this.metaHash.value;
        
        if (name !== '' && trait !== '' && desc !== '' && hash !== '') {
            
            this.setState({flag: true});
            
            let metaData = {};
            let attributes = [];
            attributes.push({trait_type: "category", value: trait});
            
            metaData["name"] = name;
            metaData["attributes"] = attributes;
            metaData["description"] = desc;
            metaData["image"] = `${IPFS_URL}${hash}`;
            
            const buffer = await Buffer.from(JSON.stringify(metaData));
            // IPFS에 업로드하고 ERC721Metadata.tokenURI 메소드를 통해 조회될 수 있도록 토큰을 mint 할 때 메타정보를 저장한다.
            const ipfsMetaHash = await ipfs.add(buffer);
            console.log(ipfsMetaHash);
            this.setState({flag: false});
            
            this.props.onChangeIpfsMetaHash(ipfsMetaHash[0].hash);
            
        }
        // const metaData = {
        //     "attributes": [
        //         {
        //             "trait_type": "Digital Art",
        //             "value": "Painting"
        //         },
        //         {
        //             "display_type": "number",
        //             "trait_type": "generation",
        //             "value": 1
        //         }
        //     ],
        //     "description": "Image description",
        //     "image": "https://gateway.ipfs.io/ipfs/QmeCX7EEqD719PCFU11auSALSKvzb1UmCbt9pofAekB6Ux",
        //     "name": "Playground of Autumn"
        // }
    }
    
    render() {
        return (
            <div style={{marginTop: '10px'}}>
                <Form horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Name
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" id="metaName" inputRef={ref => this.metaName = ref} defaultValue={"Playground of Autumn"}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Category
                        </Col>
                        <Col sm={10}>
                            <FormControl componentClass="select" inputRef={ref => this.metaTrait = ref}>
                                <option value="landscape">Landscape</option>
                                <option value="portrait">Portrait</option>
                                <option value="animal">Animal</option>
                                <option value="closeup">Closeup</option>
                                <option value="misc">Miscellaneous</option>
                            </FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Description
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" id="metaDesc" inputRef={ref => this.metaDesc = ref} defaultValue={"This is my NFT"} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Image hash
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" id="metaHash" inputRef={ref => this.metaHash = ref} />
                        </Col>
                    </FormGroup>
                </Form>
                <ButtonToolbar>
                    <ButtonGroup justified>
                        <Button href="#" bsStyle="info" onClick={this.handleUploadJson}>
                            Upload metadata (JSON)
                        </Button>
                    </ButtonGroup>
                </ButtonToolbar>
                <div style={{marginTop: '10px', marginBottom: '10px'}}>
                    {(this.state.flag)
                        ?<Loader
                            type="Puff"
                            color="#00BFFF"
                            height={24}
                            width={24}
                        />
                        :this.props.ipfsMetaHash
                    }
                </div>
            </div>
        )
    }
    
    
}


