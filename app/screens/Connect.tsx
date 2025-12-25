import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function OrderTracker() {


    return (
        <View style={styles.container}>
            <View className='flex flex-row items-center justify-between px-4'>
                <Text style={styles.brandText}>Connect.</Text>

                <View className='flex flex-row items-center gap-2'>
                    <View className='p-1.5 bg-neutral-50 rounded-[60px] inline-flex justify-start items-center gap-2.5'>
                        <Svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                            <Path d="M4 3H10.5M4 6H10.5M4 9H10.5M1.5 3H1.505M1.5 6H1.505M1.5 9H1.505" stroke="black" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round" />
                        </Svg>
                    </View>
                    <View className='p-1.5 bg-neutral-50 rounded-[60px] inline-flex justify-start items-center gap-2.5'>
                        <Svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                            <Path d="M4.5 11H7.5C10 11 11 10 11 7.5V4.5C11 2 10 1 7.5 1H4.5C2 1 1 2 1 4.5V7.5C1 10 2 11 4.5 11Z" stroke="black" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M1.01465 4.25H10.9996" stroke="black" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M1.01465 7.75H10.9996" stroke="black" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M4.25488 10.995V1.005" stroke="black" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M7.75488 10.995V1.005" stroke="black" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round" />
                        </Svg>
                    </View>
                    <View className='p-1.5 bg-green-600 rounded-[60px] inline-flex justify-start items-center gap-2.5'>
                        <Svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                            <Path d="M8.095 1H6.375V4V4.375V6.875H11V4.375V4V3.905C11 2.085 9.915 1 8.095 1Z" fill="white" />
                            <Path d="M1 5.125V7.625V7.875V8.095C1 9.915 2.085 11 3.905 11H5.625V7.875V7.625V5.125H1Z" fill="white" />
                            <Path d="M5.625 1V4.375H1V3.905C1 2.085 2.085 1 3.905 1H5.625Z" fill="white" />
                            <Path d="M11 7.625V8.095C11 9.915 9.915 11 8.095 11H6.375V7.625H11Z" fill="white" />
                        </Svg>
                    </View>
                </View>

            </View>


            <View className="flex flex-row items-center justify-between pt-3 border-b border-gray-200 px-4">


                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 16 }}
                    className="flex-1 pr-3"
                >
                    <View className="flex flex-row items-center gap-6">
                        <Text className="text-green-600 text-base border-b border-green-600 pb-3">
                            For You
                        </Text>

                        <Text className="text-black/50 text-base pb-3">
                            Food
                        </Text>

                        <Text className="text-black/50 text-base pb-3">
                            Announcement
                        </Text>

                        <Text className="text-black/50 text-base pb-3">
                            Politics
                        </Text>

                        <Text className="text-black/50 text-base pb-3">
                            Church
                        </Text>

                        <Text className="text-black/50 text-base pb-3">
                            Clothes
                        </Text>

                        <Text className="text-black/50 text-base pb-3">
                            Room Aethetics
                        </Text>

                    </View>
                </ScrollView>

                {/* Fixed Search Icon */}
                <View className="pl-3 border-l border-gray-300 pb-3">
                    <Svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                    >
                        <Path
                            d="M7.66634 14C11.1641 14 13.9997 11.1645 13.9997 7.66671C13.9997 4.1689 11.1641 1.33337 7.66634 1.33337C4.16854 1.33337 1.33301 4.1689 1.33301 7.66671C1.33301 11.1645 4.16854 14 7.66634 14Z"
                            stroke="black"
                            strokeOpacity="0.6"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <Path
                            d="M14.6663 14.6667L13.333 13.3334"
                            stroke="black"
                            strokeOpacity="0.6"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                </View>

            </View>


            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >

            
                {/* <View className='flex justify-start items-center w-full flex-col h-full'>

                    <View className='w-full h-[585px] bg-neutral-50 justifty-start border-b border-gray-200'>
                        <View className='flex items-center gap-2 justify-center my-12 flex-row'>
                            <Image
                                source={require('../../assets/images/image 3.png')} />
                            <Text className="justify-start text-black text-lg font-semibold ">Spotlight. 🎉</Text>
                        </View>

                        <View className='mt-12'>

                            <View className='flex items-center justify-end flex-row gap-6 pr-16'>

                                <View className='w-8 h-8 rounded-full'>
                                    <Image
                                        source={require('../../assets/images/Spot1.png')} />
                                </View>
                                <View className='w-40 h-40 bg-slate-600 rotate-[12.81deg] rounded-xl overflow-hidden'>
                                    <Image
                                        source={require('../../assets/images/spotImg1.png')} />
                                </View>

                            </View>


                            <View className='flex items-start justify-start gap-6 p-8 relative bottom-12'>


                                <View className='w-40 h-40 bg-slate-600 rotate-[-8.57deg]  rounded-xl overflow-hidden'>
                                    <Image
                                        source={require('../../assets/images/spotImg2.png')} />
                                </View>
                                <View className='w-8 h-8 rounded-full pl-8'>
                                    <Image
                                        source={require('../../assets/images/Spot2.png')} />

                                </View>

                            </View>

                            <View className='flex items-end justify-end gap-1 pr-12 relative bottom-52'>
                                <View className='w-8 h-8 rounded-full pl-8'>
                                    <Image
                                        source={require('../../assets/images/Spot3.png')} />

                                </View>


                                <View className='w-40 h-40 bg-slate-600 rotate-[-8.57deg]  rounded-xl overflow-hidden'>
                                    <Image
                                        source={require('../../assets/images/spotImg3.png')} />
                                </View>

                            </View>

                            <View className=" flex px-2.5 py-1 bg-white rounded-3xl outline outline-1 border-black/10 justify-center items-center gap-2.5 bottom-[140px] flex-row w-fit self-center z-50">
                                <Text className="justify-start text-black text-base font-semibold">Show All Spotlights</Text>
                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <Path d="M4 6.22003V9.78003C4 11.9934 5.56667 12.8934 7.48 11.7934L8.33333 11.3C8.54 11.18 8.66667 10.96 8.66667 10.72V5.28003C8.66667 5.04003 8.54 4.82003 8.33333 4.70003L7.48 4.2067C5.56667 3.1067 4 4.0067 4 6.22003Z" fill="black" />
                                    <Path d="M9.33301 5.86004V10.1467C9.33301 10.4067 9.61301 10.5667 9.83301 10.4334L10.5663 10.0067C12.4797 8.90671 12.4797 7.09337 10.5663 5.99337L9.83301 5.56671C9.61301 5.44004 9.33301 5.60004 9.33301 5.86004Z" fill="black" />
                                </Svg>
                            </View>

                        </View>


                    </View>

                    <View className="flex-1 w-full mt-12 px-4 gap-4">

                        <View className='flex items-start justify-center gap-5 mb-3'>
                            <View className='flex items-center justify-center flex-row gap-3'>
                                <View className="w-12 h-12 relative  rounded-lg overflow-hidden">
                                    <Image source={require('../../assets/images/Events.png')} />
                                </View>

                                <View className="w-14 inline-flex flex-col justify-start items-start gap-[5px]">
                                    <Text className="self-stretch justify-start text-black text-base font-semibold ">Food</Text>
                                    <Text className="self-stretch justify-start"><Text className="text-black text-sm font-normal ">24</Text><Text className="text-black/50 text-sm font-normal f"> Picks</Text></Text>
                                </View>

                            </View>

                            <View className="flex-row">


                                <View className="w-1/2 pr-3">


                                    <View className="mb-8">
                                        <View className="gap-3">
                                            <View className="w-full h-56 bg-zinc-100 rounded-xl overflow-hidden">
                                                <Image source={require('../../assets/images/Food2.png')} />
                                            </View>
                                            <View className="flex-row items-center gap-3">
                                                <View className="w-6 h-6 rounded-full bg-gray-300" />
                                                <Text className="text-black text-sm">Jerome</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View className="mb-8">
                                        <View className="gap-3">
                                            <View className="w-full h-60 bg-zinc-100 rounded-xl overflow-hidden">
                                                <Image source={require('../../assets/images/Food1.png')} />
                                            </View>
                                            <View className="flex-row items-center gap-3">
                                                <View className="w-6 h-6 rounded-full bg-gray-300" />
                                                <Text className="text-black text-sm">Ivan</Text>
                                            </View>
                                        </View>
                                    </View>

                                </View>

                                <View className="w-1/2 pl-3">

                                    <View className="mb-8">
                                        <View className="gap-3">
                                            <View className="w-full h-72 bg-zinc-100 rounded-xl overflow-hidden">
                                                 <Image source={require('../../assets/images/Food3.png')} />
                                            </View>
                                            <View className="flex-row items-center gap-3">
                                                <View className="w-6 h-6 rounded-full bg-gray-300" />
                                                <Text className="text-black text-sm">Rit</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View className="mb-8">
                                        <View className="gap-3">
                                            <View className="w-full h-60 bg-zinc-100 rounded-xl overflow-hidden">
                                                 <Image source={require('../../assets/images/Food4.png')} />
                                            </View>
                                            <View className="flex-row items-center gap-3">
                                                <View className="w-6 h-6 rounded-full bg-gray-300" />
                                                <Text className="text-black text-sm">Ralph</Text>
                                            </View>
                                        </View>
                                    </View>

                                </View>

                            </View>



                        </View>
                    </View>

                </View> */}

                {/* GRID SECTION */}
                {/* <View className="lex-row flex-wrap w-full">
                    <View className="w-1/3 aspect-square pr-1 mb-1">
                        <Image
                            source={require('../../assets/images/grid1.png')}
                            className="w-full h-full "
                            resizeMode="cover"
                        />
                    </View>

                    <View className="w-1/3 aspect-square mb-1">
                        <Image
                            source={require('../../assets/images/grid2.png')}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>

                    <View className="w-1/3 aspect-square pl-1 mb-1">
                        <Image
                            source={require('../../assets/images/Grid3.png')}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>

                    <View className="w-1/3 aspect-square pr-1 mb-1">
                        <Image
                            source={require('../../assets/images/grid4.png')}
                            className="w-full h-full "
                            resizeMode="cover"
                        />
                    </View>

                    <View className="w-1/3 aspect-square mb-1">
                        <Image
                            source={require('../../assets/images/grid5.png')}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>

                    <View className="w-1/3 aspect-square pl-1 mb-1">
                        <Image
                            source={require('../../assets/images/grid6.png')}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>


                    <View className="w-1/3 aspect-square pr-1 mb-1">
                        <Image
                            source={require('../../assets/images/grid7.png')}
                            className="w-full h-full "
                            resizeMode="cover"
                        />
                    </View>

                    <View className="w-1/3 aspect-square mb-1">
                        <Image
                            source={require('../../assets/images/grid8.png')}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>

                    <View className="w-1/3 aspect-square pl-1 mb-1">
                        <Image
                            source={require('../../assets/images/grid9.png')}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>

                    <View className="w-1/3 aspect-square pr-1 mb-1">
                        <Image
                            source={require('../../assets/images/grid10.png')}
                            className="w-full h-full "
                            resizeMode="cover"
                        />
                    </View>

                    <View className="w-1/3 aspect-square mb-1">
                        <Image
                            source={require('../../assets/images/grid11.png')}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>

                    <View className="w-1/3 aspect-square pl-1 mb-1">
                        <Image
                            source={require('../../assets/images/grid12.png')}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>

                    <View className="w-1/3 aspect-square pr-1 mb-1">
                        <Image
                            source={require('../../assets/images/grid13.png')}
                            className="w-full h-full "
                            resizeMode="cover"
                        />
                    </View>

                    <View className="w-1/3 aspect-square mb-1">
                        <Image
                            source={require('../../assets/images/grid14.png')}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>

                    <View className="w-1/3 aspect-square pl-1 mb-1">
                        <Image
                            source={require('../../assets/images/grid15.png')}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>


                </View> */}


                <View className='flex items-center justify-center w-full mt-4'>

                    <View className='flex items-center justify-center'>

                        <View className='flex flex-row p-4 items-center justify-between w-full'>
                            <View className='flex items-center justify-center gap-2 flex-row'>
                                <View className='w-6 h-6 rounded-full bg-gray-300'>
                                </View>
                                <Text className="justify-start text-black text-base font-medium">Essandoh,Not Prince</Text>
                                <View className="w-2 h-2 relative bg-black/10 rounded-[50px]" />

                                <View className='flex items-center justify-center gap-2 flex-row'>
                                    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <Path d="M8.37511 1.78V1C8.37511 0.795 8.20511 0.625 8.00011 0.625C7.79511 0.625 7.62511 0.795 7.62511 1V1.75H4.37511V1C4.37511 0.795 4.20511 0.625 4.00011 0.625C3.79511 0.625 3.62511 0.795 3.62511 1V1.78C2.27511 1.905 1.62011 2.71 1.52011 3.905C1.51011 4.05 1.63011 4.17 1.77011 4.17H10.2301C10.3751 4.17 10.4951 4.045 10.4801 3.905C10.3801 2.71 9.72511 1.905 8.37511 1.78Z" fill="black" fill-opacity="0.5" />
                                        <Path d="M10 4.92004H2C1.725 4.92004 1.5 5.14504 1.5 5.42004V8.50004C1.5 10 2.25 11 4 11H8C9.75 11 10.5 10 10.5 8.50004V5.42004C10.5 5.14504 10.275 4.92004 10 4.92004ZM4.605 9.10504C4.555 9.15004 4.5 9.18504 4.44 9.21004C4.38 9.23504 4.315 9.25004 4.25 9.25004C4.185 9.25004 4.12 9.23504 4.06 9.21004C4 9.18504 3.945 9.15004 3.895 9.10504C3.805 9.01004 3.75 8.88004 3.75 8.75004C3.75 8.62004 3.805 8.49004 3.895 8.39504C3.945 8.35004 4 8.31504 4.06 8.29004C4.18 8.24004 4.32 8.24004 4.44 8.29004C4.5 8.31504 4.555 8.35004 4.605 8.39504C4.695 8.49004 4.75 8.62004 4.75 8.75004C4.75 8.88004 4.695 9.01004 4.605 9.10504ZM4.71 7.19004C4.685 7.25004 4.65 7.30504 4.605 7.35504C4.555 7.40004 4.5 7.43504 4.44 7.46004C4.38 7.48504 4.315 7.50004 4.25 7.50004C4.185 7.50004 4.12 7.48504 4.06 7.46004C4 7.43504 3.945 7.40004 3.895 7.35504C3.85 7.30504 3.815 7.25004 3.79 7.19004C3.765 7.13004 3.75 7.06504 3.75 7.00004C3.75 6.93504 3.765 6.87004 3.79 6.81004C3.815 6.75004 3.85 6.69504 3.895 6.64504C3.945 6.60004 4 6.56504 4.06 6.54004C4.18 6.49004 4.32 6.49004 4.44 6.54004C4.5 6.56504 4.555 6.60004 4.605 6.64504C4.65 6.69504 4.685 6.75004 4.71 6.81004C4.735 6.87004 4.75 6.93504 4.75 7.00004C4.75 7.06504 4.735 7.13004 4.71 7.19004ZM6.355 7.35504C6.305 7.40004 6.25 7.43504 6.19 7.46004C6.13 7.48504 6.065 7.50004 6 7.50004C5.935 7.50004 5.87 7.48504 5.81 7.46004C5.75 7.43504 5.695 7.40004 5.645 7.35504C5.555 7.26004 5.5 7.13004 5.5 7.00004C5.5 6.87004 5.555 6.74004 5.645 6.64504C5.695 6.60004 5.75 6.56504 5.81 6.54004C5.93 6.48504 6.07 6.48504 6.19 6.54004C6.25 6.56504 6.305 6.60004 6.355 6.64504C6.445 6.74004 6.5 6.87004 6.5 7.00004C6.5 7.13004 6.445 7.26004 6.355 7.35504Z" fill="black" fill-opacity="0.5" />
                                    </Svg>

                                    <Text className="text-center justify-start text-black/50 text-[10px]">Event</Text>
                                </View>
                            </View>

                            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <Path d="M3.33333 6.66663C2.6 6.66663 2 7.26663 2 7.99996C2 8.73329 2.6 9.33329 3.33333 9.33329C4.06667 9.33329 4.66667 8.73329 4.66667 7.99996C4.66667 7.26663 4.06667 6.66663 3.33333 6.66663Z" stroke="black" stroke-opacity="0.6" />
                                <Path d="M12.6663 6.66663C11.933 6.66663 11.333 7.26663 11.333 7.99996C11.333 8.73329 11.933 9.33329 12.6663 9.33329C13.3997 9.33329 13.9997 8.73329 13.9997 7.99996C13.9997 7.26663 13.3997 6.66663 12.6663 6.66663Z" stroke="black" stroke-opacity="0.6" />
                                <Path d="M8.00033 6.66663C7.26699 6.66663 6.66699 7.26663 6.66699 7.99996C6.66699 8.73329 7.26699 9.33329 8.00033 9.33329C8.73366 9.33329 9.33366 8.73329 9.33366 7.99996C9.33366 7.26663 8.73366 6.66663 8.00033 6.66663Z" stroke="black" stroke-opacity="0.6" />
                            </Svg>

                        </View>

                        <View className="self-stretch h-72 relative bg-neutral-300 overflow-hidden">
                            <Image source={require('../../assets/images/Post1.png')} className="w-full h-full" resizeMode="cover" />
                        </View>

                        <View className='flex flex-row p-4 items-center justify-between w-full'>
                            <View className='flex items-center justify-center gap-2 flex-row'>

                                <View className='flex items-center justify-center gap-2 flex-row'>
                                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <Path d="M8.41301 13.8733C8.18634 13.9533 7.81301 13.9533 7.58634 13.8733C5.65301 13.2133 1.33301 10.46 1.33301 5.79332C1.33301 3.73332 2.99301 2.06665 5.03967 2.06665C6.25301 2.06665 7.32634 2.65332 7.99967 3.55998C8.67301 2.65332 9.75301 2.06665 10.9597 2.06665C13.0063 2.06665 14.6663 3.73332 14.6663 5.79332C14.6663 10.46 10.3463 13.2133 8.41301 13.8733Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </Svg>
                                    <Text className="justify-start text-black/70 text-xs">1.1K</Text>
                                </View>

                                <View className='flex items-center justify-center gap-2 flex-row'>
                                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <Path d="M8.66634 3.3335H9.99967V12.6668H8.66634V3.3335ZM7.33301 6.00016H5.99967V12.6668H7.33301V6.00016ZM4.66634 8.66683H3.33301V12.6668H4.66634V8.66683ZM12.6663 8.66683H11.333V12.6668H12.6663V8.66683Z" fill="black" fill-opacity="0.6" />
                                    </Svg>
                                    <Text className="justify-start text-black/70 text-xs"> 3.5K</Text>
                                </View>
                            </View>

                            <View className='flex items-center justify-center gap-4 flex-row'>

                                <Svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                    <Path d="M2.16699 6.49992V10.8333C2.16699 11.1206 2.28113 11.3961 2.48429 11.5993C2.68746 11.8024 2.96301 11.9166 3.25033 11.9166H9.75032C10.0376 11.9166 10.3132 11.8024 10.5164 11.5993C10.7195 11.3961 10.8337 11.1206 10.8337 10.8333V6.49992M8.66699 3.24992L6.50033 1.08325M6.50033 1.08325L4.33366 3.24992M6.50033 1.08325L6.50033 8.12492" stroke="black" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>

                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <Path d="M10.6663 5.99325V13.5666C10.6663 14.5333 9.97301 14.9399 9.12634 14.4732L6.50635 13.0132C6.22635 12.8599 5.773 12.8599 5.493 13.0132L2.87301 14.4732C2.02634 14.9399 1.33301 14.5333 1.33301 13.5666V5.99325C1.33301 4.85325 2.26633 3.91992 3.40633 3.91992H8.59302C9.73302 3.91992 10.6663 4.85325 10.6663 5.99325Z" stroke="black" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M14.6663 3.40658V10.9799C14.6663 11.9466 13.973 12.3532 13.1263 11.8866L10.6663 10.5132V5.99325C10.6663 4.85325 9.73302 3.91992 8.59302 3.91992H5.33301V3.40658C5.33301 2.26658 6.26633 1.33325 7.40633 1.33325H12.593C13.733 1.33325 14.6663 2.26658 14.6663 3.40658Z" stroke="black" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M4.66699 8H7.33366" stroke="black" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M6 9.33341V6.66675" stroke="black" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                            </View>



                        </View>

                        <View className='flex items-start justify-start w-full px-4'>
                            <Text className="text-left justify-start text-black text-base font-medium">Weekly Bible Study – Book of Romans</Text>
                            <Text className="self-stretch justify-start text-black/50 text-sm font-normal">This week we continue with Romans Chapter 8. Deep discussions • Real conversations • Open to everyone</Text>
                        </View>

                          <View className='flex items-start justify-between w-full p-4 flex-row'>
                                    <View className='flex items-center gap-2 justify-center flex-row'>
                                        <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <Path d="M12.0286 4.92909C11.4161 2.23409 9.0653 1.02075 7.0003 1.02075C7.0003 1.02075 7.0003 1.02075 6.99447 1.02075C4.9353 1.02075 2.57863 2.22825 1.96613 4.92325C1.28363 7.93325 3.12697 10.4824 4.7953 12.0866C5.41363 12.6816 6.20697 12.9791 7.0003 12.9791C7.79363 12.9791 8.58697 12.6816 9.19947 12.0866C10.8678 10.4824 12.7111 7.93908 12.0286 4.92909ZM7.0003 7.85159C5.9853 7.85159 5.1628 7.02909 5.1628 6.01409C5.1628 4.99909 5.9853 4.17659 7.0003 4.17659C8.0153 4.17659 8.8378 4.99909 8.8378 6.01409C8.8378 7.02909 8.0153 7.85159 7.0003 7.85159Z" fill="black" fill-opacity="0.5" />
                                        </Svg>
                                        <Text className="justify-start text-black/80 text-sm ">Hall Seminar Room 2</Text>
                                    </View>

                                    <View className='flex items-center gap-2 justify-center flex-row'>
                                        <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <Path d="M12.0286 4.92909C11.4161 2.23409 9.0653 1.02075 7.0003 1.02075C7.0003 1.02075 7.0003 1.02075 6.99447 1.02075C4.9353 1.02075 2.57863 2.22825 1.96613 4.92325C1.28363 7.93325 3.12697 10.4824 4.7953 12.0866C5.41363 12.6816 6.20697 12.9791 7.0003 12.9791C7.79363 12.9791 8.58697 12.6816 9.19947 12.0866C10.8678 10.4824 12.7111 7.93908 12.0286 4.92909ZM7.0003 7.85159C5.9853 7.85159 5.1628 7.02909 5.1628 6.01409C5.1628 4.99909 5.9853 4.17659 7.0003 4.17659C8.0153 4.17659 8.8378 4.99909 8.8378 6.01409C8.8378 7.02909 8.0153 7.85159 7.0003 7.85159Z" fill="black" fill-opacity="0.5" />
                                        </Svg>
                                        <Text className="justify-start text-black/80 text-sm ">Tue 12, 8PM</Text>
                                    </View>

                                    <View className='flex items-center gap-2 justify-center flex-row'>
                                        <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <Path d="M12.0286 4.92909C11.4161 2.23409 9.0653 1.02075 7.0003 1.02075C7.0003 1.02075 7.0003 1.02075 6.99447 1.02075C4.9353 1.02075 2.57863 2.22825 1.96613 4.92325C1.28363 7.93325 3.12697 10.4824 4.7953 12.0866C5.41363 12.6816 6.20697 12.9791 7.0003 12.9791C7.79363 12.9791 8.58697 12.6816 9.19947 12.0866C10.8678 10.4824 12.7111 7.93908 12.0286 4.92909ZM7.0003 7.85159C5.9853 7.85159 5.1628 7.02909 5.1628 6.01409C5.1628 4.99909 5.9853 4.17659 7.0003 4.17659C8.0153 4.17659 8.8378 4.99909 8.8378 6.01409C8.8378 7.02909 8.0153 7.85159 7.0003 7.85159Z" fill="black" fill-opacity="0.5" />
                                        </Svg>
                                        <Text className="justify-start"><Text className="text-black/80 text-sm font-normal">2 </Text><Text className="text-black/50 text-xs font-normal">Buses</Text></Text>
                                    </View>
                            </View>      

                    </View>

            

                </View>

                <View className='flex items-center justify-center w-full mt-4'>

                    <View className='flex items-center justify-center'>

                        <View className='flex flex-row p-4 items-center justify-between w-full'>
                            <View className='flex items-center justify-center gap-2 flex-row'>
                                <View className='w-6 h-6 rounded-full bg-gray-300'>
                                </View>
                                <Text className="justify-start text-black text-base font-medium">Essandoh,Not Prince</Text>
                                <View className="w-2 h-2 relative bg-black/10 rounded-[50px]" />

                                <View className='flex items-center justify-center gap-2 flex-row'>
                                    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <Path d="M8.37511 1.78V1C8.37511 0.795 8.20511 0.625 8.00011 0.625C7.79511 0.625 7.62511 0.795 7.62511 1V1.75H4.37511V1C4.37511 0.795 4.20511 0.625 4.00011 0.625C3.79511 0.625 3.62511 0.795 3.62511 1V1.78C2.27511 1.905 1.62011 2.71 1.52011 3.905C1.51011 4.05 1.63011 4.17 1.77011 4.17H10.2301C10.3751 4.17 10.4951 4.045 10.4801 3.905C10.3801 2.71 9.72511 1.905 8.37511 1.78Z" fill="black" fill-opacity="0.5" />
                                        <Path d="M10 4.92004H2C1.725 4.92004 1.5 5.14504 1.5 5.42004V8.50004C1.5 10 2.25 11 4 11H8C9.75 11 10.5 10 10.5 8.50004V5.42004C10.5 5.14504 10.275 4.92004 10 4.92004ZM4.605 9.10504C4.555 9.15004 4.5 9.18504 4.44 9.21004C4.38 9.23504 4.315 9.25004 4.25 9.25004C4.185 9.25004 4.12 9.23504 4.06 9.21004C4 9.18504 3.945 9.15004 3.895 9.10504C3.805 9.01004 3.75 8.88004 3.75 8.75004C3.75 8.62004 3.805 8.49004 3.895 8.39504C3.945 8.35004 4 8.31504 4.06 8.29004C4.18 8.24004 4.32 8.24004 4.44 8.29004C4.5 8.31504 4.555 8.35004 4.605 8.39504C4.695 8.49004 4.75 8.62004 4.75 8.75004C4.75 8.88004 4.695 9.01004 4.605 9.10504ZM4.71 7.19004C4.685 7.25004 4.65 7.30504 4.605 7.35504C4.555 7.40004 4.5 7.43504 4.44 7.46004C4.38 7.48504 4.315 7.50004 4.25 7.50004C4.185 7.50004 4.12 7.48504 4.06 7.46004C4 7.43504 3.945 7.40004 3.895 7.35504C3.85 7.30504 3.815 7.25004 3.79 7.19004C3.765 7.13004 3.75 7.06504 3.75 7.00004C3.75 6.93504 3.765 6.87004 3.79 6.81004C3.815 6.75004 3.85 6.69504 3.895 6.64504C3.945 6.60004 4 6.56504 4.06 6.54004C4.18 6.49004 4.32 6.49004 4.44 6.54004C4.5 6.56504 4.555 6.60004 4.605 6.64504C4.65 6.69504 4.685 6.75004 4.71 6.81004C4.735 6.87004 4.75 6.93504 4.75 7.00004C4.75 7.06504 4.735 7.13004 4.71 7.19004ZM6.355 7.35504C6.305 7.40004 6.25 7.43504 6.19 7.46004C6.13 7.48504 6.065 7.50004 6 7.50004C5.935 7.50004 5.87 7.48504 5.81 7.46004C5.75 7.43504 5.695 7.40004 5.645 7.35504C5.555 7.26004 5.5 7.13004 5.5 7.00004C5.5 6.87004 5.555 6.74004 5.645 6.64504C5.695 6.60004 5.75 6.56504 5.81 6.54004C5.93 6.48504 6.07 6.48504 6.19 6.54004C6.25 6.56504 6.305 6.60004 6.355 6.64504C6.445 6.74004 6.5 6.87004 6.5 7.00004C6.5 7.13004 6.445 7.26004 6.355 7.35504Z" fill="black" fill-opacity="0.5" />
                                    </Svg>

                                    <Text className="text-center justify-start text-black/50 text-[10px]">Event</Text>
                                </View>
                            </View>

                            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <Path d="M3.33333 6.66663C2.6 6.66663 2 7.26663 2 7.99996C2 8.73329 2.6 9.33329 3.33333 9.33329C4.06667 9.33329 4.66667 8.73329 4.66667 7.99996C4.66667 7.26663 4.06667 6.66663 3.33333 6.66663Z" stroke="black" stroke-opacity="0.6" />
                                <Path d="M12.6663 6.66663C11.933 6.66663 11.333 7.26663 11.333 7.99996C11.333 8.73329 11.933 9.33329 12.6663 9.33329C13.3997 9.33329 13.9997 8.73329 13.9997 7.99996C13.9997 7.26663 13.3997 6.66663 12.6663 6.66663Z" stroke="black" stroke-opacity="0.6" />
                                <Path d="M8.00033 6.66663C7.26699 6.66663 6.66699 7.26663 6.66699 7.99996C6.66699 8.73329 7.26699 9.33329 8.00033 9.33329C8.73366 9.33329 9.33366 8.73329 9.33366 7.99996C9.33366 7.26663 8.73366 6.66663 8.00033 6.66663Z" stroke="black" stroke-opacity="0.6" />
                            </Svg>

                        </View>

                        <View className="self-stretch h-72 relative bg-neutral-300 overflow-hidden">

                        </View>

                        <View className='flex flex-row p-4 items-center justify-between w-full'>
                            <View className='flex items-center justify-center gap-2 flex-row'>

                                <View className='flex items-center justify-center gap-2 flex-row'>
                                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <Path d="M8.41301 13.8733C8.18634 13.9533 7.81301 13.9533 7.58634 13.8733C5.65301 13.2133 1.33301 10.46 1.33301 5.79332C1.33301 3.73332 2.99301 2.06665 5.03967 2.06665C6.25301 2.06665 7.32634 2.65332 7.99967 3.55998C8.67301 2.65332 9.75301 2.06665 10.9597 2.06665C13.0063 2.06665 14.6663 3.73332 14.6663 5.79332C14.6663 10.46 10.3463 13.2133 8.41301 13.8733Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </Svg>
                                    <Text className="justify-start text-black/70 text-xs">1.1K</Text>
                                </View>

                                <View className='flex items-center justify-center gap-2 flex-row'>
                                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <Path d="M8.66634 3.3335H9.99967V12.6668H8.66634V3.3335ZM7.33301 6.00016H5.99967V12.6668H7.33301V6.00016ZM4.66634 8.66683H3.33301V12.6668H4.66634V8.66683ZM12.6663 8.66683H11.333V12.6668H12.6663V8.66683Z" fill="black" fill-opacity="0.6" />
                                    </Svg>
                                    <Text className="justify-start text-black/70 text-xs"> 3.5K</Text>
                                </View>
                            </View>

                            <View className='flex items-center justify-center gap-4 flex-row'>

                                <Svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                    <Path d="M2.16699 6.49992V10.8333C2.16699 11.1206 2.28113 11.3961 2.48429 11.5993C2.68746 11.8024 2.96301 11.9166 3.25033 11.9166H9.75032C10.0376 11.9166 10.3132 11.8024 10.5164 11.5993C10.7195 11.3961 10.8337 11.1206 10.8337 10.8333V6.49992M8.66699 3.24992L6.50033 1.08325M6.50033 1.08325L4.33366 3.24992M6.50033 1.08325L6.50033 8.12492" stroke="black" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>

                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <Path d="M10.6663 5.99325V13.5666C10.6663 14.5333 9.97301 14.9399 9.12634 14.4732L6.50635 13.0132C6.22635 12.8599 5.773 12.8599 5.493 13.0132L2.87301 14.4732C2.02634 14.9399 1.33301 14.5333 1.33301 13.5666V5.99325C1.33301 4.85325 2.26633 3.91992 3.40633 3.91992H8.59302C9.73302 3.91992 10.6663 4.85325 10.6663 5.99325Z" stroke="black" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M14.6663 3.40658V10.9799C14.6663 11.9466 13.973 12.3532 13.1263 11.8866L10.6663 10.5132V5.99325C10.6663 4.85325 9.73302 3.91992 8.59302 3.91992H5.33301V3.40658C5.33301 2.26658 6.26633 1.33325 7.40633 1.33325H12.593C13.733 1.33325 14.6663 2.26658 14.6663 3.40658Z" stroke="black" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M4.66699 8H7.33366" stroke="black" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M6 9.33341V6.66675" stroke="black" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                            </View>



                        </View>

                        <View className='flex items-start justify-start w-full px-4'>
                            <Text className="text-left justify-start text-black text-base font-medium">Weekly Bible Study – Book of Romans</Text>
                            <Text className="self-stretch justify-start text-black/50 text-sm font-normal">This week we continue with Romans Chapter 8. Deep discussions • Real conversations • Open to everyone</Text>
                        </View>

                          <View className='flex items-start justify-between w-full p-4 flex-row'>
                                    <View className='flex items-center gap-2 justify-center flex-row'>
                                        <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <Path d="M12.0286 4.92909C11.4161 2.23409 9.0653 1.02075 7.0003 1.02075C7.0003 1.02075 7.0003 1.02075 6.99447 1.02075C4.9353 1.02075 2.57863 2.22825 1.96613 4.92325C1.28363 7.93325 3.12697 10.4824 4.7953 12.0866C5.41363 12.6816 6.20697 12.9791 7.0003 12.9791C7.79363 12.9791 8.58697 12.6816 9.19947 12.0866C10.8678 10.4824 12.7111 7.93908 12.0286 4.92909ZM7.0003 7.85159C5.9853 7.85159 5.1628 7.02909 5.1628 6.01409C5.1628 4.99909 5.9853 4.17659 7.0003 4.17659C8.0153 4.17659 8.8378 4.99909 8.8378 6.01409C8.8378 7.02909 8.0153 7.85159 7.0003 7.85159Z" fill="black" fill-opacity="0.5" />
                                        </Svg>
                                        <Text className="justify-start text-black/80 text-sm ">Hall Seminar Room 2</Text>
                                    </View>

                                    <View className='flex items-center gap-2 justify-center flex-row'>
                                        <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <Path d="M12.0286 4.92909C11.4161 2.23409 9.0653 1.02075 7.0003 1.02075C7.0003 1.02075 7.0003 1.02075 6.99447 1.02075C4.9353 1.02075 2.57863 2.22825 1.96613 4.92325C1.28363 7.93325 3.12697 10.4824 4.7953 12.0866C5.41363 12.6816 6.20697 12.9791 7.0003 12.9791C7.79363 12.9791 8.58697 12.6816 9.19947 12.0866C10.8678 10.4824 12.7111 7.93908 12.0286 4.92909ZM7.0003 7.85159C5.9853 7.85159 5.1628 7.02909 5.1628 6.01409C5.1628 4.99909 5.9853 4.17659 7.0003 4.17659C8.0153 4.17659 8.8378 4.99909 8.8378 6.01409C8.8378 7.02909 8.0153 7.85159 7.0003 7.85159Z" fill="black" fill-opacity="0.5" />
                                        </Svg>
                                        <Text className="justify-start text-black/80 text-sm ">Tue 12, 8PM</Text>
                                    </View>

                                    <View className='flex items-center gap-2 justify-center flex-row'>
                                        <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <Path d="M12.0286 4.92909C11.4161 2.23409 9.0653 1.02075 7.0003 1.02075C7.0003 1.02075 7.0003 1.02075 6.99447 1.02075C4.9353 1.02075 2.57863 2.22825 1.96613 4.92325C1.28363 7.93325 3.12697 10.4824 4.7953 12.0866C5.41363 12.6816 6.20697 12.9791 7.0003 12.9791C7.79363 12.9791 8.58697 12.6816 9.19947 12.0866C10.8678 10.4824 12.7111 7.93908 12.0286 4.92909ZM7.0003 7.85159C5.9853 7.85159 5.1628 7.02909 5.1628 6.01409C5.1628 4.99909 5.9853 4.17659 7.0003 4.17659C8.0153 4.17659 8.8378 4.99909 8.8378 6.01409C8.8378 7.02909 8.0153 7.85159 7.0003 7.85159Z" fill="black" fill-opacity="0.5" />
                                        </Svg>
                                        <Text className="justify-start"><Text className="text-black/80 text-sm font-normal">2 </Text><Text className="text-black/50 text-xs font-normal">Buses</Text></Text>
                                    </View>
                            </View>      

                    </View>

            

                </View>


</ScrollView>



          

 


        </View>
    );
} 



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        paddingTop: 74,
        // paddingHorizontal: 16,
    },
    brandText: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
        color: 'rgba(0,0,0,0.5)',
    },
    headerSection: {
        flexDirection: 'column',
        gap: 8,
        marginTop: 90,
        width: 240,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: 'black',
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(0,0,0,0.6)',
    },
    inputSection: {
        flexDirection: 'column',
        gap: 12,
        marginTop: 50,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderRadius: 16,
        padding: 12,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: 'white',
        borderColor: 'rgba(0,0,0,0.2)',
        borderWidth: 0.5,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
});