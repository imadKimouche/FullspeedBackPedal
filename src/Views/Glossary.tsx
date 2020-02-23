import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {Icon} from 'react-native-elements';
import {API, InsectType} from '../Utils/API';
import BugsCard from '../Components/BugsCard';
import Colors from '../Utils/Colors';
import * as Animatable from 'react-native-animatable';

interface IState {
  isLoading: boolean;
  page: "Cards" | "Details";
  insectList: InsectType[];
}

export default class Glossary extends PureComponent<null, IState> {
  state: IState = {
    isLoading: true,
    insectList: [],
    page: "Cards",
  };

  componentDidMount() {
    this._requestInsects();
  }

  _requestInsects = () => {
    API.get(`${API.url_insects}`)
      .then((response: Response) => {
        this.setState({isLoading: false});
        return this._apiResponse(response);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
        return err;
      });
  };

  _apiResponse = (response: Response) => {
    response.json().then((responseJSON: InsectType[]) => {
      this.setState({insectList: responseJSON});
    });
  };

  onInsectClick = (index : number) => {
    this.setState({page: "Details"});
    console.log("Click on" + index);
  }

  render() {
    const { insectList, page } = this.state;
    return (
      <View style={styles.container}>
        <Animatable.View
            animation="fadeInDown" 
            style={styles.headerContainer}>
            <Animatable.View
              animation="pulse" easing="ease-out" iterationCount="infinite" >
              <Icon
                color={Colors.primaryText}
                name="bug"
                type="font-awesome"
                size={62}
              />
            </Animatable.View>
          <Text  style={styles.heading}>Insectes</Text>
        </Animatable.View>
        <FlatList
          keyExtractor={(item : InsectType) => item.name}
          data={ insectList }
          renderItem={({item, index} : {item : InsectType, index: number}) => {
            return <BugsCard 
              picture={item.picture}
              title={item.name}
              index={index}
              onClick={this.onInsectClick}
              animation={page === "Cards" ? "bounceInLeft" : "fadeOutLeft"}
              duration={page === "Cards" ? 2000 : 700}/>;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: Colors.secondaryLight,
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.black,
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },
});
