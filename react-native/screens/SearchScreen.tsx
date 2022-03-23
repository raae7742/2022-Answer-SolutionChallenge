import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import type { Navigation, Notice } from '../types';
import SearchedNotice from '../components/SearchedNotice';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { Column } from 'native-base';
import { useAuth } from '../contexts/Auth';


export default function SearchScreen({ navigation }: Navigation) {
    const auth = useAuth(); // TODO: get notices by send header(`auth.AuthData`) to server

    const [search, setSearch] = useState<string>('');
    const [filteredNotices, setFilteredNotices] = useState<Notice[]>(
        [
            {
                id: 1,
                cid: 1, 
                date: "2022-02-19",
                saved_titles: [
                    "17th Graduation Ceremony",
                    "School Day"
                ]
            },
            {
                id: 1,
                cid: 1, 
                date: "2022-02-10",
                saved_titles: [
                    "17th Graduation Ceremony",
                    "School Day"
                ]
            }
        ]
    );
    const [notices, setNotices] = useState<Notice[]>(
        [
            {
                id: 1,
                cid: 1, 
                date: "2022-02-19",
                saved_titles: [
                    "17th Graduation Ceremony",
                    "School Day"
                ]
            },
            {
                id: 1,
                cid: 1, 
                date: "2022-02-10",
                saved_titles: [
                    "17th Graduation Ceremony",
                    "School Day"
                ]
            }
    ])
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [searchDate, setSearchDate] = useState<string>("Click calendar icon to select date.");

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        console.log("A date has been picked: ", date);
        const splitedDate = date.toISOString().split("T")[0];
        setSearchDate(splitedDate);
        if (date) {
            const newData = notices.filter((notice) => {
                return notice.date === splitedDate;
            })
            setFilteredNotices(newData);
        } else {
            setFilteredNotices(notices);
        }
        hideDatePicker();
    };

    const searchFilter = (text: string | void) => {
        if (text) {
            const newData = notices.filter((notice) => {
                const noticeData = notice.saved_titles.join().toUpperCase();
                const textData = text.toUpperCase();
                return noticeData.indexOf(textData) > -1;
            })
            setFilteredNotices(newData);
        } else {
            setFilteredNotices(notices);
        }
        setSearch(text ? text : '');
    };
        
    return (
        <View style={styles.container}>
            <View style={styles.searchDateWrapper}>
                <Text style={styles.smallDescription}>SEARCH BY DATE</Text>
                <View style={styles.searchDateContainer}>
                    <TouchableHighlight onPress={showDatePicker}>
                        <Text style={styles.calendarIcon}>🗓</Text>
                    </TouchableHighlight>
                    <Text style={styles.selectedDate}>{searchDate}</Text>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </View>
            </View>
            <View >
                <Text style={styles.smallDescription}>SEARCH BY TEXT</Text>
                <SearchBar
                    platform='ios'
                    onChangeText={(text: string | void) => searchFilter(text)}
                    onClear={() => searchFilter('')}
                    placeholder="Type Here..."
                    value={search}
                />
            </View>
            <View style={styles.searchResults}>
                <Text style={styles.smallDescription}>RESULTS</Text>
                {filteredNotices?.map((notice, index) => 
                    <SearchedNotice  key={"nt_" + index} id={notice.id} date={notice.date} saved_titles={notice.saved_titles} />
                )}
            </View>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
    },
    smallDescription: {
        alignSelf: "flex-start",
        fontSize: 12,
        marginBottom: 8,
        color: "#666666",
        width: "100%"
    },
    searchDateWrapper: {
        marginBottom: 20,
    },
    searchDateContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    searchResults: {
        width: '100%'
    },
    calendarIcon: {
        fontSize: 24,
    },
    selectedDate: {
        fontSize: 14,
        color: "#666666",
        marginRight: 30,
        width: "72%"
    },
})
