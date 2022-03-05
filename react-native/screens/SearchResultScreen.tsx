import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

import AppLoading from 'expo-app-loading';
import useFonts from '../hooks/useFonts'
import SwipeUpDown from 'react-native-swipe-up-down';
import BottomDrawer from '../components/BottomDrawer';
import type { Navigation, Notice } from '../types';

const { width } = Dimensions.get('window');

interface SearchResultScreenProps {
    navigation: Navigation,
    route: {
        key: string,
        name: string,
        params: {
            date: string
        },
        path: string | undefined,
    }
}

export default function SearchResultScreen(props: SearchResultScreenProps) {
    const [imageUri, setImageUri] = useState("../assets/images/calendar.png");
	const [notice, setNotice] = useState<Notice>({date: "", notices: {total_results: [], notice_body: []}});
	const [showFullText, setShowFullText] = useState<boolean>(false);
	const [showTranslated, setShowTranslated] = useState<boolean>(true);
	const [isFullDrawer, setFullDrawer] = useState<boolean>(false);

    React.useEffect(() => {
        // TODO: Fetch API
        setNotice({
            date: "2022-02-10",
            notices: {
                total_results: [
                    "17th Graduation Ceremony",
                    "School Day"
                ],
                notice_body: [{
                    id: 1,
                    title: "17th Graduation Ceremony",
                    summary: [
                        {id: 1, content: "17th Graduation Ceremony is on February 14th", highlight: true},
                        {id: 2, content: "held  in classrooms to prevent the spread of COVID-19", highlight: false}
                    ],
                    fullText: "We wish you good health and happiness in your family",
                    korean: "희망찬 새해를 맞이하여 학부모님의 가정에 건강과 행복이 함께 하시기를 기원합니다."
                }, {
                    id: 2,
                    title: "School Day",
                    summary: [
                        {id: 1, content: "School day is March 2nd", highlight: true},
                        {id: 2, content: "Parents participate is available", highlight: false}
                    ],
                    fullText: "The school starts on March 2nd, and parents who want to participate in the opening ceremony are request to com to auditorium",
                    korean: "개학일은 3월 2일이며, 개학식에 참여하고자 하는 학부모님께서는 10시까지 강당으로 오시기 바랍니다."
                }]
            }
        })
    }, [])

    const handleFullText = (): void => {
		setShowFullText(!showFullText);
	}

    const handleTranslatedText = (): void => {
		setShowTranslated(!showTranslated);
	}

    return (
        <View style={styles.container}>
            <Swiper>
                {notice && notice.notices.notice_body.length > 0 && notice.notices.notice_body.map((notice, index) =>
					<ImageBackground style={styles.container} resizeMode="cover" imageStyle={{ opacity: 0.5 }} source={{ uri: imageUri }} key={"ib_" + index}>
						<SwipeUpDown
							itemMini={
								<BottomDrawer 
									results={notice.summary}
									fullText={{translated: notice.fullText, korean: notice.korean}} 
									showFullText={showFullText}
									showTranslated={showTranslated}
									isFullDrawer={isFullDrawer}
									isTranslateScreen={false}
									handleFullText={handleFullText}
									handleTranslatedText={handleTranslatedText}
								/>
							}
							itemFull={
								<BottomDrawer 
									results={notice.summary}
									fullText={{translated: notice.fullText, korean: notice.korean}} 
									showFullText={showFullText}
									showTranslated={showTranslated}
									isFullDrawer={isFullDrawer}
									isTranslateScreen={false}
									handleFullText={handleFullText}
									handleTranslatedText={handleTranslatedText}
								/>
							}
							onShowMini={() => setFullDrawer(false)}
							onShowFull={() => setFullDrawer(true)}
							animation="easeInEaseOut"
							disableSwipeIcon
							extraMarginTop={10}
							swipeHeight={Dimensions.get('window').height*0.5}
						/>
					</ImageBackground>
				)}

            </Swiper>
        </View>   
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "mistyrose"
    },
    slideContainer: {
        flex: 1,
        backgroundColor: "#333"
    }
})