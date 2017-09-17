/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  ListView,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements'

  //use this data for simple listview
  const data_array=["Hey there! Just wanted to let you know that you are beautiful just the way you are. Please don’t change yourself for anyone! Keep up that confidence you got in you and stay awesome! Hope you have a great day! :)",
"Oh dear! that is awful! Please take care and hope you get better soon - on the bright side, you get to stay home from work / school! :P",
"My deepest condolences. I understand how you feel, I’ve been through it myself and it’s one of the most dreadful thing but I know you will make it through. You are not a disappointment. It’s going to be hard but you are not alone and you are cared for! I know that you loved your baby dearly and that’s what matters the most!  Babies lost in the womb were never touched by fear. They were never cold. Never hungry. Never alone & most importantly always loved.",
"As for the future, it remains unknown. Anything can happen, and often we often make wrong decisions but hey that’s just life. The best we can do with the future is to prepare and savour the possibilities of what can be done in the present. Do your best! Good luck! Rooting for you. :D",
"Wanted to remind you that you are loved. I know things are hard right now but you don’t have to do it alone. Don’t let the darkness steal the beautiful person you have inside. Do what you can do right now, and no more than that. Wish you the best~"];


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
export default class Vibes extends Component {
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
  _updateDataSource(data) 
  {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data)
  })
  }
  _renderRow(rowData,sectionId,rowId)
  {
    return(
              <TouchableHighlight>
                <View style={styles.row}>
                  <Text style={styles.row_style}>{rowData}</Text>
                </View>
              </TouchableHighlight>
    );

  }
  render() {
    return (
      <View style={styles.Container}>
        <ListView style={styles.listview_style}
          dataSource={this.state.dataSource}
          renderRow={(rowData,sectionId,rowId) => this._renderRow(rowData, sectionId, rowId)}
          enableEmptySections={true}
          removeClippedSubviews={false}
          renderSeparator={(sectionId, rowId) => <View key={sectionId+rowId} style={styles.separator_style} />}
          renderHeader={() =>
            <View style={styles.listview_header}>
            <Icon
                size={32}
                name='chat'
                color='#00b764'
                />
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
    color: 'black',
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
    paddingTop: 20,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  row_style: {
    flex: 1,
    fontSize: 15,
    textAlign: 'left',
    margin: 10,
    color: 'black'
  },
  separator_style: {
   flex: 1,
   height: StyleSheet.hairlineWidth,
   backgroundColor: 'grey',
  },
  input: {
    height: 40,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginLeft: 5
  },
});