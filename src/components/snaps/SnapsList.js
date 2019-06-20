import React, {Component} from 'react';
import Carousel from 'react-native-snap-carousel';
import {Platform, StyleSheet, Image, Text, View, Dimensions, ActivityIndicator, Alert} from 'react-native';
import Video from 'react-native-video'

const {width, height } = Dimensions.get('window') ;

export default class MyCarousel extends Component {
    constructor(props){
      super(props);
      
      this.state = {
        itemIndex: 0,
        data: [],
        isLoading: true,
      };
    }

      /***
        * This method used to create the UI for Snaps.
        * Here I am conditinally render the snaps that getting from the server using API.
      **/
    _renderItem = ({item, index}) => {
      const count = this.state.data.length;  
        if(item.type === 'jpeg' || item.type === 'jpg') {
            
          return <View>
            <Image
              style={{width: width, height: height}}
              source={{uri: item.url}}
            />
        </View>
        } else if(item.type === 'mp4') { 
          const paused =  index % count == this.state.itemIndex;      
          return (<View style={styles.container}>
                    <Video
                      source={{uri: item.url}}
                      style={{ width: width, height: height }}
                      paused={!paused}
                      repeat={true}
                      resizeMode={"cover"}
                      ignoreSilentSwitch={"obey"}
                      
                      
                    />
                  </View>)
          
        }
    }

    /***
      * This methos used to capture the index of the curernt showing snap.
    **/
    setIndexHandler = (itemIndex) => {
      this.setState({itemIndex})
    }

    /***
      * This is react lifecycle hook for API calling. 
      * Here I am getting snaps using 'fetch' method from server and set into the state of this component.
    **/
    componentDidMount() {

      const url = "http://d6.iworklab.com:165/api/Values";
      fetch(url)
        .then(response => response.json())
        .then( responseData => {
          this.setState({data: responseData.Data, isLoading: false})
        })
        .catch(err => {
          Alert.alert('Error',err.message);
          this.setState({isLoading: false})
        });
    }

    render () {
       if(this.state.isLoading) {
          return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
       }
       if(this.state.data.length) {
          return (
            <Carousel              
              data={this.state.data}
              renderItem={this._renderItem}
              sliderWidth={height}
              itemWidth={width}
              loop={true}
              autoplay={true}
              autoplayDelay={200}
              autoplayInterval={5000}
              onSnapToItem={this.setIndexHandler}
              shouldOptimizeUpdates={false}
              loopClonesPerSide={0}
            />
        );
       } else {
           return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>No Record Found</Text>
          </View>
       }
        
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  }
})







