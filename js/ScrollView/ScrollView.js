/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  TouchableHighlight,
} from 'react-native';
import Swipeout from 'react-native-swipeout'

  //use this data for simple listview
  const data_array=[
'Me',
'Allison',
'Arthur',
'Ana',
'Alex',
'Arlene',
'Alberto',
'Barry',
'Bertha',
'Bill',
'Bonnie',
'Bret',
'Beryl',
'Chantal',
'Cristobal',
'Claudette',
'Charley',
'Cindy',
'Chris',
'Dean',
'Dolly',
'Danny',
'Danielle',
'Dennis',
'Debby',
'Erin',
'Edouard',
'Erika',
'Earl',
'Emily',
'Ernesto',
'Felix',
'Fay',
'Fabian',
'Frances',
'Franklin',
'Florence',
'Gabielle',
'Gustav',
'Grace',
'Gaston',
'Gert',
'Gordon',
'Humberto',
'Hanna',
'Henri',
'Hermine',
'Harvey',
'Helene',
'Iris',
'Isidore',
'Isabel',
'Ivan',
'Irene',
'Isaac',
'Jerry',
'Josephine',
'Juan',
'Jeanne',
'Jose',
'Joyce',
'Karen',
'Kyle',
'Kate',
'Karl',
'Katrina',
'Kirk',
'Lorenzo',
'Lili',
'Larry',
'Lisa',
'Lee',
'Leslie',
'Michelle',
'Marco',
'Mindy',
'Maria',
'Michael',
'Noel',
'Nana',
'Nicholas',
'Nicole',
'Nate',
'Nadine',
'Olga',
'Omar',
'Odette',
'Otto',
'Ophelia',
'Oscar',
'Pablo',
'Paloma',
'Peter',
'Paula',
'Philippe',
'Patty',
'Rebekah',
'Rene',
'Rose',
'Richard',
'Rita',
'Rafael',
'Sebastien',
'Sally',
'Sam',
'Shary',
'Stan',
'Sandy',
'Tanya',
'Teddy',
'Teresa',
'Tomas',
'Tammy',
'Tony',
'Van',
'Vicky',
'Victor',
'Virginie',
'Vince',
'Valerie',
'Wendy',
'Wilfred',
'Wanda',
'Walter',
'Wilma',
'William',
'Kumiko',
'Aki',
'Miharu',
'Chiaki',
'Michiyo',
'Itoe',
'Nanaho',
'Reina',
'Emi',
'Yumi',
'Ayumi',
'Kaori',
'Sayuri',
'Rie',
'Miyuki',
'Hitomi',
'Naoko',
'Miwa',
'Etsuko',
'Akane',
'Kazuko',
'Miyako',
'Youko',
'Sachiko',
'Mieko',
'Toshie',
'Junko'];


  // // use this data for listview with sectionHeader
  // const data_array=[];
  // data_array['Sport']=['Soccer','Moto GP','Others'];
  // data_array['IT & Technology']=['IT','Technology','Science'];
  // data_array['Entertainment']=['Music','Movie','Art'];
  // data_array['Interest']=['Travel','Style','Fashion','Business'];
  // data_array['News & Info']=['Politics','World','Phenomenon'];
  // data_array['Health']=['Health','Food','Lifestyle'];

  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
  });



export default class SampleMenu extends Component {
  constructor(props) {
    super(props);
    //definition of listview datasource
    this.state = {
      //this code use for simple list view
      dataSource: ds.cloneWithRows(data_array),
      //this code use for listview with sectionHeader
      //dataSource: ds.cloneWithRowsAndSections(data_array),
      filter_string:'',
    };
  }
  deleteRow(rowId)
  {
    let index = data_array.indexOf(rowId);
    if(index>-1)
    {
      data_array.splice(index, 1);
    }
    this.setState({dataSource:ds.cloneWithRows(data_array)});
  }
  _handleSwipeout(sectionID, rowID) {
  for (var i = 0; i < data_array.length; i++) 
  {
    if (i != rowID) data_array[i].active = false
    else data_array[i].active = true
  }
  this._updateDataSource(data_array)
  }
  _updateDataSource(data) 
  {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data)
  })
  }
  _renderRow(rowData,sectionId,rowId)
  {
      let swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => { this.deleteRow(rowData) }
    }];
    return(
      <Swipeout right={swipeBtns}
                autoClose='true'
                backgroundColor= 'transparent'>
              <TouchableHighlight 
              onPress={() => {
                if(data_array[rowId] == "Me")
                {
                  //render map of self location
                  this.props.navigator.push({index: 1});
                }
                  /* this is sample to show alert when you click on item
                  Alert.alert(
                    'Enter title here..',
                    'You click on '+rowData,
                  );
                  */
              }}>
                <View style={styles.row}>
                  <Text style={styles.row_style}>{rowData}</Text>
                </View>
              </TouchableHighlight>
            </Swipeout>
    );

  }
  render() {

    return (
      <View style={styles.Container}>
        <ListView style={styles.listview_style}
          dataSource={this.state.dataSource}
          renderRow={(rowData,sectionId,rowId) => this._renderRow(rowData, sectionId, rowId)}
          enableEmptySections={true}
          renderSeparator={(sectionId, rowId) => <View key={sectionId+rowId} style={styles.separator_style} />}
          renderHeader={() =>
            <View style={styles.listview_header}>
              <TextInput style={styles.input} placeholder="Search..."
                onChangeText={(text) =>{
                  var rows = [];

                  
                  //this code use for simple list view
                  for (var i=0; i < data_array.length; i++) {
                     var stateName = data_array[i].toLowerCase();
                     if(stateName.search(text.toLowerCase()) !== -1){
                       rows.push(data_array[i]);
                     }
                   }
                   

                   //this code use for listview with sectionHeader
                  //  for (var key in data_array) {
                  //    if (!rows[key]) {
                  //      rows[key] = [];
                  //    }

                  //    for (var i=0; i < data_array[key].length; i++) {
                  //       var stateName = data_array[key][i].toLowerCase();
                  //       if(stateName.search(text.toLowerCase()) !== -1){
                  //         rows[key].push(data_array[key][i]);
                  //       }
                  //     }

                  //     if(rows[key].length==0)
                  //       delete rows[key];
                  //  }

                   //this code use for simple list view
                   this.setState({dataSource:ds.cloneWithRows(rows)});
                   //this code use for listview with sectionHeader
                   //this.setState({dataSource:ds.cloneWithRowsAndSections(rows)});
                }}
              />
            </View>
          }
          //
          // renderSectionHeader={(rowData,sectionId)=>
          //   <View style={styles.sectionHeader}>
          //     <Text style={styles.sectionHeaderText}>{sectionId}</Text>
          //   </View>
          //}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    backgroundColor: '#48D1CC'
  },
  sectionHeaderText: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: 16,
    color: 'white',
    paddingLeft: 10
  },
  listview_header: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C1C1C1',
  },
  listview_style: {
    padding: 10,
    backgroundColor: '#34495e',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#34495e',
  },
  row_style: {
    flex: 1,
    fontSize: 15,
    textAlign: 'left',
    margin: 10,
    color: '#fff'
  },
  separator_style: {
   flex: 1,
   height: StyleSheet.hairlineWidth,
   backgroundColor: '#fff',
  },
  input: {
    height: 40,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
});