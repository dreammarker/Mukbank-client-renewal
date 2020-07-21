import React, {useState} from 'react';
import 'rxjs/add/operator/map';
import {View} from 'react-native';
import {Searchbar} from 'react-native-paper';

import styles from './SearchScreenStyle';
import {FilterData} from './Components/FilterData';
import SelectFilter from './Components/SelectFilter';

function SearchScreen() {
  const [FilterDatas] = useState<object>(FilterData);

  return (
    <View style={styles.container as any}>
      <Searchbar style={styles.searchBar as any} placeholder="검색" />
      <View style={styles.chipView as any}>
        {FilterDatas.map((item: object) => (
          <View key={JSON.stringify(item)}>
            <SelectFilter list={item} />
          </View>
        ))}
      </View>
    </View>
  );
}

export default SearchScreen;
