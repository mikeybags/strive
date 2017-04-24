import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
// import Dropzone from 'react-dropzone';
import {addPicture} from '../actions/add_picture'
import { setCookie } from 'redux-cookie';

class ProfilePicturePicker extends Component {
  constructor(props){
    super(props);

    this.state = {
      picture:"paper.jpeg"
    }
  }
  static contextTypes = {
    router:PropTypes.object
  };

  submitPicture(){
    this.props.addPicture(this.state.picture).then((data) => {
      this.props.setCookie("picture", data.payload.data.picture, {expires:7});
      this.context.router.push('profile')
    })
  }
  changePicture(newPic){
    this.setState({picture: newPic})
  }
  render(){
    return (
      <form>
        <h3>Choose an Avatar</h3>
          <div className="row">
            <div className="col-sm-4">
              <img className={`picture-option img-responsive ${this.state.picture === 'paper.jpeg' ? 'picture-option-selected' : ''}`} src="static/images/paper.jpeg" onClick={this.changePicture.bind(this, 'paper.jpeg')} />
            </div>
            <div className="col-sm-4">
            <img className={`picture-option img-responsive ${this.state.picture === 'rock.jpeg' ? 'picture-option-selected' : ''}`}  src="static/images/rock.jpeg" onClick={this.changePicture.bind(this, 'rock.jpeg')} />
            </div>
            <div className="col-sm-4">
              <img className={`picture-option img-responsive ${this.state.picture === 'scissors.jpeg' ? 'picture-option-selected' : ''}`} src="static/images/scissors.jpeg" onClick={this.changePicture.bind(this, 'scissors.jpeg')} />
            </div>
          </div>
        <button type="button" onClick={this.submitPicture.bind(this)} className="btn btn-primary" >Okay!</button>
      </form>
    )
  }
}

export default connect(null, {addPicture, setCookie})(ProfilePicturePicker)
