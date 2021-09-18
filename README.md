## 실행방법

1. `DeedIPFSToken.sol` 컨트랙트 컴파일

2. Ganache에 배포

3. `/app` 디렉토리에서 `yarn install`

4. 로컬 개발 서버 실행 `yarn start`

## 화면

1. 이미지를 선택

2. `Upload`를 클릭하여 IPFS에 업로드(해쉬 값이 리턴됨)

3. NFT 토큰의 메타정보 작성 - 이미지 업로드 후 리턴받은 해쉬 값을 Image hash에 넣음

4. 메타정보를 다시 IPFS에 업로드(해쉬 값이 리턴됨)

5. `Mint`를 클릭하여 NFT 토큰 생성 - 위에서 작성한 NFT 메타정보 URL이 토큰 생성시 참조되어 저장됨
   ```javascript
     tokenURIs[tokenId] = Strings.strConcat(baseTokenURI(), ipfsHash);
   ```

<img src="https://github.com/swkim109/Simple-NFT/blob/main/ipfs.PNG"/>


메타정보(JSON 형식)의 예시:  
[NFT 메타정보](https://gateway.ipfs.io/ipfs/QmeR79bzjyTLnyojXvCueqL8rKvawgcZHe65CDkuDid7Yw)
