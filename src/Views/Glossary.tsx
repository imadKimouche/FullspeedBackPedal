import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {Icon} from 'react-native-elements';
import {API, InsectType,IData} from '../Utils/API';
import BugsCard from '../Components/BugsCard';
import Colors from '../Utils/Colors';
import * as Animatable from 'react-native-animatable';
import {withNavigationFocus, NavigationScreenProp, StackActions} from 'react-navigation';
import { SCREEN_WIDTH } from '../Utils/Utility';

interface BugInfo {
  id: number;
  name: string;
  picture: string;
  symptoms: IData[];
  treatments: IData[];
  avoids: IData[];
}

interface IState {
  isLoading: boolean;
  insectList: InsectType[];
  showCard: boolean;
  dataReady: boolean;
}

interface IProps {
  isFocused: boolean;
  navigation: NavigationScreenProp<any, any>;
}

class Glossary extends PureComponent<IProps, IState> {
  insectsData: BugInfo[] = [];

  state: IState = {
    isLoading: true,
    insectList: [],
    showCard: true,
    dataReady: false,
  };

  _handleResponse = (id: number, name: string, picture: string, response: Response) => {
    response.json().then(responseJson => {
      var info : BugInfo = {
        id: id,
        name: name,
        picture: picture,
        symptoms: this._normalizeData(responseJson.symptoms, 'symptom'),
        treatments: this._normalizeData(responseJson.treatments, 'treatment'),
        avoids: this._normalizeData(responseJson.avoids, 'avoid')
      };
      this.insectsData.push(info);
      this.setState({dataReady: true});
    });
  };

  _normalizeData(data: {id: number; text: string}[], type: string) : IData[] {
    return data.map((item: {id: number; text: string}, index: number) => {
      return {id: index, text: item[type]};
    });
  }

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
          showCard: true,
        });
        return err;
      });
  };

  _apiResponse = (response: Response) => {
    response.json().then((responseJSON: InsectType[]) => {
      responseJSON.forEach(element => {
        API.get(API.url_insectAll + element.id).then(response => {
          this._handleResponse(element.id, element.name, element.picture, response);
        });
      });
      this.setState({insectList: responseJSON});
    });
  };

  onInsectClick = (name : string) => {
    this.setState({showCard: false});
    setTimeout(()=>{
      this.setState({showCard: true});
      const pushAction = StackActions.push({
        routeName: 'BugView',
        params: {
          info: this.insectsData.find(e => e.name === name),
        },
      });
      this.props.navigation.dispatch(pushAction);
    }, 700);
  }

  render() {
    const { insectList, showCard} = this.state;
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
          <Text style={styles.heading}>Bugs</Text>
        </Animatable.View>
        <View style={{flex: 1}}>
          <FlatList
            style={styles.cardElement}
            keyExtractor={(item : InsectType) => item.name}
            data={ insectList }
            renderItem={({item, index} : {item : InsectType, index: number}) => {
              return <BugsCard 
                picture={item.picture}
                title={item.name}
                index={index}
                onClick={this.onInsectClick}
                animation={showCard && this.props.navigation.state.routeName === "Glossary" ? "bounceInLeft" : "fadeOutLeft"}
                duration={showCard && this.props.navigation.state.routeName === "Glossary" ? 2000 : 700}/>;
            }}
          />
        </View>
      </View>
    );
  }
}

export default withNavigationFocus(Glossary)

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
  cardElement: {
    position: "absolute",
    width: SCREEN_WIDTH,
  },
  detailsElement: {
    position: "absolute",
    width: SCREEN_WIDTH,
    backgroundColor: 'red',
  }
});
