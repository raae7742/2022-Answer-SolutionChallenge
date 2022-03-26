import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native';
import { Text, Box } from 'native-base'
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../core/theme';
import type { Navigation, UserData } from '../types';
import { useAuth } from '../contexts/Auth';
import { StackActions } from '@react-navigation/native';
import i18n from 'i18n-js'
import '../locales/i18n';


export default function HomeScreen({ navigation }: Navigation) {
    const [events, setEvents] = useState<{event_num: number, children: { cid: number, cname: string, event: string[] }[]}>();
    const [totalEventsCount, setTotalEventsCount] = useState<number>(4);
    const [nowSelectedChildId, setNowSelectedChildId] = useState<number>(1);
    const [user, setUser] = useState<UserData>();
    const auth = useAuth();

    useEffect(()=> {
        setUser(auth?.userData);

        // TODO: get events by send header(`auth.AuthData`) to server
        // mockup data
        setEvents({
            event_num: 4,
            children: [
                {
                    cid: 1,
                    cname: "Soo",
                    event: [
                        "the 17th Graduate Seremony",
                        "Do-Dream Festival"
                    ]
                }, {
                    cid: 2,
                    cname: "Hee",
                    event: [
                        // "17th Graduate Seremony",
                        // "Do-Dream Festival"
                    ]
                }
            ]
        })

        if (auth?.authData?.jwt_token) {
            fetch('http://localhost:8080/user/children', {
                method: 'GET',
                headers: {
                    'JWT_TOKEN': auth.authData.jwt_token
                },
                redirect: 'follow'
            })
            .then(response => response.json())
            .then(data => setEvents(data)) // TODO: console.log(data)
            .catch((error) => {
                console.log(error)
                if(error?.response?.status==401) {
                    //redirect to login
                    Alert.alert(i18n.t('sessionExpired'));
                    auth.signOut();
                    navigation.dispatch(StackActions.popToTop())
                }
            });
        }
        // TODO: fetch API
        // .then => set nowSelectedChild 
    }, [auth])

    const handleNowSelectedChildId = (cid: number) => {
        setNowSelectedChildId(cid);
    }
    
    return (
        <>{
            user && events && (
            <SafeAreaView style={styles.container}>
                <View style={styles.profile}>
                    <ImageBackground style={styles.backgroundImage} source={require("../assets/images/pink-background-cropped.png")} resizeMode="cover" imageStyle={{ borderRadius: 12 }}>
                        <Image style={styles.profileImage} source={require(`../assets/images/profile-images/profile-1.png`)} />
                        <View style={styles.profielTextWrapper}>
                            <Text fontFamily="heading" fontWeight={700} fontStyle="normal" fontSize="xl">{i18n.t('hello_1') + user.username + i18n.t('hello_2')}</Text>
                            <Text fontFamily="mono" fontWeight={400} fontStyle="normal" fontSize="sm">{i18n.t('eventCount_1') + events.event_num + i18n.t('eventCount_2')}</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.noticeWrapper}>
                    <Text style={styles.smallTitle} fontFamily="heading" fontWeight={700} fontStyle="normal" fontSize="xl">{i18n.t('todayEvent')}</Text>
                    <View style={styles.childButtonWrapper}>
                        {events.children?.map((notice, index) => 
                            <TouchableOpacity key={'n_'+index} style={[styles.childButton, {
                                backgroundColor: nowSelectedChildId === notice.cid ? theme.colors.primary : "#ffffff",
                            }]} onPress={() => handleNowSelectedChildId(notice.cid)}>
                                <Text fontWeight={500} style={[{
                                    color: nowSelectedChildId !== notice.cid ? theme.colors.primary : "#ffffff",
                                }]}>{notice.cname}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.todayNoticeWrapper}>
                        {events.children?.filter(notice => notice.cid === nowSelectedChildId)[0].event?.length ? (
                                events.children?.filter(notice => notice.cid === nowSelectedChildId)[0].event.map((item, index) => 
                                    <View key={'e_'+index} style={{flexDirection: "row"}}>
                                        {/* <Text fontWeight={500} fontSize="md" lineHeight={28} pr={4} style={{color: theme.colors.primary}}>{item.time}</Text> */}
                                        <Text fontSize="md" lineHeight={28}>{index+1 + '. ' + item}</Text>
                                    </View>
                                )
                            ) : (
                                <Box style={styles.emptyBox}>
                                    <Ionicons name="musical-note" size={64} />
                                    <Text fontSize="md" pt={2}>{i18n.t('noEvent')}</Text>
                                </Box>
                            )
                        }
                    </View>
                </View>
                <View style={styles.functionButtonWrapper}>
                    <Text style={styles.smallTitle} fontFamily="heading" fontWeight={700} fontStyle="normal" fontSize="xl">{i18n.t('functions')}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Translate')}>
                        <ImageBackground source={require("../assets/images/button-background.png")} style={[styles.bigButton]} imageStyle={{ borderRadius: 12 }}>
                            <View>
                                <Text style={[styles.buttonName, styles.deepBlue]} fontWeight={700} fontSize="xl" pb={2}>{i18n.t('translate')}</Text>
                                <Text style={styles.deepBlue} fontSize="sm">{i18n.t('translateDesc')}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <ImageBackground source={require("../assets/images/button-background.png")} style={[styles.bigButton]} imageStyle={{ borderRadius: 12 }}>
                            <View>
                                <Text style={[styles.buttonName, styles.deepBlue]} fontWeight={700} fontSize="xl" pb={2}>{i18n.t('search')}</Text>
                                <Text style={styles.deepBlue} fontSize="sm">{i18n.t('searchDesc')}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </SafeAreaView> )}
        </>
    )
}

const styles = StyleSheet.create({
    buttonImage: {
        position: 'absolute',
        top: 8,
        right: 0,
        width: 190,
        height: 190,
        alignSelf: 'flex-end'
    },
    container: {
        backgroundColor: "#ffffff",
        padding: 20,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    profile: {
        height: 92,
        width: "90%",
        margin: 22,
        borderRadius: 20,
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    noticeWrapper: {
        width: "88%",
        flex: 1,
        marginBottom: 18,
    },
    childButtonWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    childButton: {
        borderWidth: 1,
        borderColor: theme.colors.primary,
        height: 30,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        alignSelf: 'flex-start',
        marginRight: 8,
    },
    todayNoticeWrapper: {
        alignSelf: "flex-start",
        paddingTop: 18,
        paddingHorizontal: 12,
        overflow: "scroll",
        flex: 1,
        width: "100%"
    },
    profileImage: {
        width: 60,
        height: 60,
    },
    profielTextWrapper: {
        paddingRight: 30,
    },
    functionButtonWrapper: {
        flex: 1.5,
        width: '88%',
        paddingBottom: 30,
    },
    smallTitle: {
        marginBottom: 8,
    },
    buttonName: {
        fontSize: 24,
    },
    bigButton: {
        padding: 26,
        marginBottom: 18,
        borderRadius: 16,
        shadowColor: "#999999",
        shadowOpacity: 0.5,
        shadowRadius: 8,
        shadowOffset: {
          height: 0,
          width: 0,
        },
    },
    deepBlue: {
        color: theme.colors.secondary,
    },
    lightPink: {
        color: theme.colors.primary,
    },
    emptyBox: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
