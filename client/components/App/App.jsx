import React from 'react';
import ReactImageMagnify from 'react-image-magnify'
import axios from 'axios';

import styles from '../App/App.css'
import GalleryImage from '../GalleryImage/GalleryImage.jsx';
// import Upload from '../Upload/Upload.jsx'

const NO_IMAGE_URL = 'https://s3-us-west-1.amazonaws.com/hrla22-ebay-fe/NoImageFound.jpg';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productId: 1,
      images: [],
      profileImage: '',
      selectedImage: '',
      tempProfileImage: null,
      startIndex: 0,
      endIndex: 5
    };
    this.render = this.render.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.setProfileImage = this.setProfileImage.bind(this);
    this.changeProfileImage = this.changeProfileImage.bind(this);
    this.tempProfileImageOffHover = this.tempProfileImageOffHover.bind(this);
    this.tempProfileImageOnHover = this.tempProfileImageOnHover.bind(this);
    this.postImage = this.postImage.bind(this);
  }

  componentDidMount() {
    this.fetchImages();
  }

  fetchImages() {
    axios.get('/products/images', {
      params: {
        productId: this.state.productId
      }
    })
    .then(res => {
      console.log('fetch images successful', res);
      this.setState({
        images: res.data,
      }, () => {
        this.setProfileImage();
        if (this.state.images.length - 1 < this.state.endIndex) {
          this.setState({
            endIndex: (this.state.images.length - 1 < 0 ? 0 : this.state.images.length - 1)
          })
        }
      })
    })
    .catch(err => console.log('axios error fetching images,', err))
  }

  setProfileImage() {
    console.log('In set profile')
    if (this.state.images.length === 0) {
      this.setState({
        profileImage: NO_IMAGE_URL
      })
    } else {
      this.state.images.forEach(image => {
        if (image.is_primary === 1) {
          this.setState({
            profileImage: image.img_url
          })
        }
      })
    }
  }

  changeProfileImage(src) {
    this.setState({
      profileImage: src,
      selectedImage: src,
      tempProfileImage: src
    }, () => {
      this.render()
    });
  }

  tempProfileImageOnHover(e) {
    this.setState({
      tempProfileImage: this.state.profileImage,
      profileImage: e.target.src
    })
  }

  tempProfileImageOffHover(e) {
    this.setState({
      profileImage: this.state.tempProfileImage,
      tempProfileImage: null
    })
  }

  handleClickNext() {
    if (this.state.endIndex !== this.state.images.length - 1) {
      if (this.state.images.length - this.state.endIndex < 6) {
        let shift = this.state.images.length - 1 - this.state.endIndex;
        this.setState({
          startIndex: this.state.startIndex + shift,
          endIndex: this.state.endIndex + shift
        });
      } else {
        this.setState({
          startIndex: this.state.startIndex + 6,
          endIndex: this.state.endIndex + 6
        });
      }
    }
  }

  handleClickPrev() {
    if (this.state.startIndex !== 0) {
      if (this.state.startIndex - 6 < 0) {
        this.setState({
          startIndex: 0,
          endIndex: 5
        });
      } else {
        this.setState({
          startIndex: this.state.startIndex - 6,
          endIndex: this.state.endIndex - 6
        });
      }
    }
  }

  postImage(e) {
    e.preventDefault();
    console.log(e.target);
    axios.post('/products/images', {
      productId: this.state.productId
    })
    .then((res) => {
      console.log('successfully posted image');
    })
    .catch((err) => {
      console.log('error posting image,', err);
    })
  }

  renderProfileImage() {
    if (this.state.images.length === 0) {
      return (
        <img 
          className="noImage"
          src={this.state.profileImage} 
          height="500"
          width="500"
        />
      )
    } else {
      return (
        <ReactImageMagnify {...{
          smallImage: {
            src: this.state.profileImage,
            height: 500,
            width: 500
          },
          largeImage: {
            src: this.state.profileImage,
            height: 1000,
            width: 1000,
          },
          isHintEnabled: true,
          shouldHideHintAfterFirstActivation: false
        }} />
      )
    }
  }

  renderPrevButton() {
    if (this.state.images.length > 6) {
      return (
        <a class={ styles.button } id={styles.prev} href="javascript:;" value={this.state.startIndex} onClick={() => this.handleClickPrev()}>&lt;</a>
      )
    }
  }

  renderNextButton() {
    if (this.state.images.length > 6) {
      return (
        <a class={ styles.button } id={styles.next} href="javascript:;" value={this.state.images.length - 1 - this.state.endIndex} onClick={() => this.handleClickNext()}>&gt;</a>
      )
    }
  }

  render() {
    return(
      <div className="app">
        <div className={ styles.profileImageContainer }>
          <div className={ styles.profileImage}>
            {this.renderProfileImage()}
          </div>
        </div>
        <div className={ styles.gallery }>
          {this.renderPrevButton()}
          <table className={ styles.table } cellSpacing="0">
            <tbody>
              <tr className={ styles.tableRow }>
                {this.state.images.map((image, index) => {
                  if (index >= this.state.startIndex && index <= this.state.endIndex) {
                    return (
                      <GalleryImage 
                        key={index}
                        selectedImage={this.state.selectedImage}
                        isMatch = {this.state.selectedImage === image.img_url}
                        index={index} 
                        url={image.img_url} 
                        changeProfileImage={this.changeProfileImage} 
                        tempProfileImageOnHover={this.tempProfileImageOnHover} 
                        tempProfileImageOffHover={this.tempProfileImageOffHover}
                      />
                    )
                  }
                })}
              </tr>
            </tbody>
          </table>
          {this.renderNextButton()}
        </div>
        {/* <div>
          <Upload productId={this.state.productId} postImage={this.postImage}/>
        </div> */}
      </div>
    )
  }

}