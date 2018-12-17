import React from 'react';
import { StyleSheet, Dimensions, Animated, FlatList, Text, View } from 'react-native';
import Screen from '../Component/Screen';
import SearchBar from '../Component/SearchBar';
import TopBar from '../Component/TopBar';
import { startAPI } from '../../Controller/API/APIController';
import { changeLocale, strings } from '../../Controller/Localization/Localization';
import filterMatch from '../../Controller/Filtering/Filtering';
import { parseByTopGlossingJSON, parseByTopFreeJSON, parseByAppDetailJSON } from '../../Model/AppModel';
import HorizontalAppCell from './Component/HorizontalAppCell';
import VerticalAppCell from './Component/VerticalAppCell';
import LoadMore from '../Component/LoadMore';
import { AnimatedFlatList, CustomizedFlatList } from '../Component/PresetFlatList';
import TouchableDebounce from '../Component/TouchableDebounce';
import log from '../../Controller/Logger/Logger';
import { NOTIFICATION, ORIENTATION } from '../../Config/Variables';

export default class LandingScreen extends Screen {

	/* constructor */
	constructor(props) {
		super(props);

		changeLocale('zhhk');

		/* variable */
		this.keyExtractor = (item, index) => index.toString();
		this.filterKeys = ['name', 'category', 'author', 'summary'];
		this.lockEndReached = false;
		this.forceOnline = false;
		this.loadedGlossingList = [];
		this.displayGlossingList = [];
		this.loadedTopList = [];
		this.displayTopList = [];
		this.allowSyncScrolling = true;
		this.topGlossingFlatList = null;
		this.loadMoreRef = null;
		this.fetchCounter = 0;
		this.topFreeLimit = 100;
		this.perPage = 10;
		this.page = 1;
		this.defaultDisplayList = [
			{ section: 'section_title', title: strings('recommend') },
			{ section: 'section_top_glossing', dataList: [] }
		];
		this.connectSection = { section: 'section_connect', title: strings('connect') };

		this.state = {
			containerPaddingLeft: portraitPaddingLeft,
			displayList: this.defaultDisplayList,
			displayTopGrossing: false,
			refreshing: false,
			searchingText: '',
		};

		/* callback */
		this.onChangeText = (input) => {
			this.setState(
				{ searchingText: input },
				() => {
					if (input.length == 0) {
						this.state.displayList = [...this.defaultDisplayList];
						this.page = 1;
					}
					this.loadTopGlossList();
					this.loadTopFreeList(this.page);
				}
			);
		}

		this.onRatingLayout = (item) => {
			if (!item.inited) {
				this.fetchRating(item);
			}
		}

		this.onEndReached = ({ distanceFromEnd }) => {
			if (!this.lockEndReached) {
				this.handleLoadMore();
				this.lockEndReached = true;
			}
		}

		this.scrollListener = (event) => {
			if (this.allowSyncScrolling && this.topGlossingFlatList) {
				let scrollY = event.nativeEvent.contentOffset.y;
				if (scrollY < screenHeight) {
					this.topGlossingFlatList.scrollToOffset({ offset: scrollY, animated: false });
				}
			}
		}

		this.handleRefresh = () => {
			if (this.state.displayList.length > 1) {
				this.setState(
					{ displayList: [] },
					() => this.refresh()
				)
			}
			else {
				this.refresh();
			}
		}

		this.handleLoadMore = () => {
			if (this.loadedTopList.length > 0) {
				if (this.page < (this.topFreeLimit / this.perPage)) {
					if (this.loadMoreRef) {
						this.loadMoreRef.startAnimation();
					}
					setTimeout(() => this.fetchTopFree(this.page + 1, this.forceOnline), 1500);
				}
				else {
					if (this.loadMoreRef) {
						this.loadMoreRef.stopAnimation();
					}
				}
			}
		}
	}

	/* component */
	componentWillMount() {
		super.componentWillMount();
		this.fetchTopGlossing(this.forceOnline);
		this.fetchTopFree(this.page, this.forceOnline);
	}

	callbackFired(key, value) {
		if (key === NOTIFICATION.LAYOUT_ORIENTATION) {
			if (value.orientation == ORIENTATION.PORTRAIT) {
				this.setState({ containerPaddingLeft: portraitPaddingLeft });
			}
			else {
				this.setState({ containerPaddingLeft: landscapePaddingLeft });
			}
		}
	}

	/* fetchdata */
	fetchTopGlossing(forceOnline) {
		startAPI(
			'AppleAPI',
			'get_top_10_grossing_app',
			{ 'support_caching': true, 'force_online': forceOnline },
			{
				success: (responseData) => {
					if (responseData) {
						this.loadedGlossingList = parseByTopGlossingJSON(responseData);
						this.loadTopGlossList();
					}
				},
				fail: (error) => {
					this.setState(
						{ displayList: [this.connectSection] },
						() => {
							if (this.loadMoreRef) {
								this.loadMoreRef.stopAnimation();
							}
						}
					);
				}
			}
		);
	}

	fetchTopFree(page, forceOnline) {
		if (this.loadedTopList.length == 0 || forceOnline) {
			this.loadedTopList = [];
			startAPI(
				'AppleAPI',
				'get_top_100_free_app',
				{ 'support_caching': true, 'force_online': forceOnline, 'limit': this.topFreeLimit },
				{
					success: (responseData) => {
						if (responseData) {
							this.loadedTopList = parseByTopFreeJSON(responseData);
							this.loadTopFreeList(page);
						}
					},
					fail: (error) => {
						this.setState(
							{ displayList: [this.connectSection] },
							() => {
								if (this.loadMoreRef) {
									this.loadMoreRef.stopAnimation();
								}
							}
						);
					}
				}
			)
		}
		else {
			this.loadTopFreeList(page);
		}
	}

	fetchRating(item) {
		this.fetchCounter ++;
		startAPI(
			'AppleAPI', 'lookup_app', { 'id': item.id, 'force_online': this.forceOnline, 'support_caching': true, 'invisible_fetching': true },
			{
				success: (responseData) => {
					this.fetchCounter --;
					if (responseData) {
						parseByAppDetailJSON(item, responseData);
					}
					if (this.fetchCounter == 0) {
						setTimeout(() => this.forceUpdate(), 500);
					}
				},
				fail: (error) => {
					this.fetchCounter --;
				}
			}
		);
	}

	/* private */
	loadTopGlossList() {
		this.displayGlossingList = filterMatch(this.state.searchingText, this.loadedGlossingList, this.filterKeys);
		this.defaultDisplayList[1].dataList = this.displayGlossingList;
		this.setState({ displayTopGrossing: !this.state.displayTopGrossing });
	}

	loadTopFreeList(page) {
		if (this.state.searchingText.length > 0) {
			this.displayTopList = filterMatch(this.state.searchingText, this.loadedTopList, this.filterKeys);
			this.setState({ displayList: [...this.defaultDisplayList, ...this.displayTopList] });
		}
		else {
			this.page = page;
			let slicedTopList = this.sliceTopList();
			if (page == 1) {
				this.setState({ displayList: [...this.defaultDisplayList, ...slicedTopList] });
			}
			else {
				this.setState({ displayList: [...this.state.displayList, ...slicedTopList] });
			}
		}
		if (this.loadMoreRef) {
			this.loadMoreRef.stopAnimation();
		}
	}

	sliceTopList() {
		let startIndex = (this.page - 1) * this.perPage;
		return this.loadedTopList.slice(startIndex, startIndex + this.perPage);
	}

	refresh() {
		this.forceOnline = true;
		this.page = 1;
		this.fetchTopGlossing(this.forceOnline);
		this.fetchTopFree(this.page, this.forceOnline);
		this.forceOnline = false;
	}

	/* render */
	render() {
		return (
			<View style={styles.container}>
				<TopBar style={styles.topBar}>
					<View style={styles.searchBarBox}>
						<SearchBar style={styles.searchBar} value={this.state.searchingText} onChangeText={(input) => this.onChangeText(input)} placeholder={strings('search_placeholder')} />
					</View>
				</TopBar>
				<View style={styles.flatlistBox}>
					<AnimatedFlatList
						forwardRef={(ref) => this.flatListRef = ref}
						data={this.state.displayList}
						keyExtractor={this.keyExtractor}
						renderItem={this.renderSection}
						onEndReachedThreshold={0.5}
						onEndReached={this.onEndReached}
						onScroll={
							Animated.event(
								[
									{ nativeEvent: { contentOffset: { y: this.scrollY } } }
								],
								{
									useNativeDriver: true,
									listener: this.scrollListener
								}
							)
						}
						onMomentumScrollEnd={this.lockEndReached = false}
						onRefresh={this.handleRefresh}
						refreshing={this.state.refreshing}
						ListFooterComponent={this.renderFooter}
					/>
				</View>
			</View>
		);
	}

	renderSection = ({ item, index }) => {
		switch (item.section) {
			case 'section_connect':
				return this.renderConnect(item);

			case 'section_title':
				return this.renderSectionTitle(item);

			case 'section_top_glossing':
				return this.renderTopGlossing(item);

			default:
				// top free
				return this.renderTopFree(item, index);
		}
	}

	renderConnect = (item) => {
		return (
			<View style={styles.connectionBox}>
				<TouchableDebounce onPress={this.handleRefresh} style={styles.connectionTouch}>
					<Text style={styles.connectionText}>{item.title}</Text>
				</TouchableDebounce>
				<Text style={styles.connectionErrorDescription}>{strings('connect_error_description')}</Text>
			</View>
		);
	}

	renderSectionTitle = (item) => {
		return (
			<View style={[styles.titleBox, { paddingLeft: this.state.containerPaddingLeft }]}>
				<Text style={styles.title}>{item.title}</Text>
			</View>
		);
	}

	renderTopGlossing = (item) => {
		return (
			<CustomizedFlatList
				initialNumToRender={10}
				forwardRef={(ref) => this.topGlossingFlatList = ref}
				style={{ borderBottomColor: '#eee', borderBottomWidth: 1 }}
				data={item.dataList}
				extraData={this.state.displayTopGrossing}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				keyExtractor={this.keyExtractor}
				renderItem={this.renderTopGlossingItem}
				ListHeaderComponent={<View style={{ width: this.state.containerPaddingLeft }} />}
			/>
		);
	}

	renderTopGlossingItem = ({ item, index }) => {
		return <HorizontalAppCell item={item} index={index} />;
	}

	renderTopFree = (item, index) => {
		let count = (index - this.defaultDisplayList.length);
		return <VerticalAppCell item={item} index={count} onRatingLayout={() => this.onRatingLayout(item)} paddingLeft={this.state.containerPaddingLeft} />;
	}

	renderFooter = () => {
		return (
			<LoadMore ref={(ref) => this.loadMoreRef = ref}>
				<Text style={{ fontSize: 16, color: '#333' }}>{strings('loading_more')}</Text>
			</LoadMore>
		);
	}
}

/* style */
const screenHeight = Dimensions.get('window').height;
const portraitPaddingLeft = 20;
const landscapePaddingLeft = 40;

const styles = StyleSheet.create(
	{
		container: {
			width: '100%', height: '100%'
		},
		topBar: {
			backgroundColor: '#f9f9f9', borderBottomWidth: 1, borderBottomColor: '#eee'
		},
		searchBarBox: {
			width: '100%', paddingHorizontal: 25
		},
		searchBar: {
			width: '100%', height: 35, backgroundColor: '#e4e5e6', borderRadius: 6, borderWidth: 1, borderColor: '#aaaaaa11'
		},
		flatlistBox: {
			width: '100%', flex: 1
		},
		connectionBox: {
			width: '100%', paddingVertical: 30, alignItems: 'center'
		},
		connectionTouch: {
			paddingHorizontal: 50, paddingVertical: 6, borderRadius: 3, backgroundColor: '#1bb4e9'
		},
		connectionText: {
			fontSize: 16, color: 'white'
		},
		connectionErrorDescription: {
			fontSize: 13, color: '#666', width: 300, textAlign: 'center', marginTop: 30
		},
		titleBox: {
			width: '100%', paddingVertical: 20
		},
		title: {
			fontSize: 20, fontWeight: '500'
		}
	}
);