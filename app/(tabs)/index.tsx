import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // ou outro pacote de ícones de sua preferência
import Container from "@/components/Container";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Switch from "@/components/Switch";
import { useMemo, useRef, useState } from "react";
import Swiper from "react-native-deck-swiper";
import { useCatAPI } from "@/hooks/useCatAPI";

type CatList = {
  id: string;
  name: string;
  rating: number;
  location: string;
  image: string;
};

export default function HomeScreen() {
  const [isSwitched, setIsSwitched] = useState(false);
  const swiper = useRef<Swiper<any>>(null);
  const { cats, isLoading, error, refetch, voteCat } = useCatAPI();

  const catList: CatList[] = useMemo(() => {
    return cats.map((cat) => ({
      id: cat.id,
      name: cat.breeds?.[0]?.name || "Unknown",
      rating: cat.breeds?.[0]?.cat_friendly || 0,
      location: cat.breeds?.[0]?.origin || "Unknown",
      image: cat.url,
    }));
  }, [cats]);

  const renderCard = (card: CatList) => {
    return (
      <View style={styles.cardContainer}>
        <Image source={{ uri: card.image }} style={styles.catImage} />
        <View style={styles.catInfoContainer}>
          <View style={styles.catMainInfo}>
            <Text style={styles.catText}>{card.name}</Text>
            <Text style={styles.catText}>{card.rating}</Text>
          </View>
          <Text style={styles.catLocation}>{card.location}</Text>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Text>Error: {error.message}</Text>
        <TouchableOpacity onPress={refetch}>
          <Text>Try Again</Text>
        </TouchableOpacity>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.switchContainer}>
            <Switch value={isSwitched} onValueChange={setIsSwitched} />
          </View>

          <View style={styles.swiperContainer}>
            <Swiper
              cards={catList}
              renderCard={renderCard}
              onSwipedLeft={(cardIndex) => {
                voteCat(catList[cardIndex].id, -1);
              }}
              onSwipedRight={(cardIndex) => {
                voteCat(catList[cardIndex].id, 1);
              }}
              cardIndex={0}
              backgroundColor={"transparent"}
              stackSize={1}
              ref={swiper}
              overlayLabels={overlayLabels}
            />
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.roundButton]}
              onPress={() => swiper.current?.swipeLeft()}
            >
              <AntDesign name="close" size={30} color="red" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roundButton]}
              onPress={() => swiper.current?.swipeRight()}
            >
              <AntDesign name="heart" size={30} color="green" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  swiperContainer: {
    height:
      Dimensions.get("window").height * (Platform.OS === "ios" ? 0.7 : 0.6),
    width: Dimensions.get("window").width,
    zIndex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 100,
  },
  switchContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 40,
    marginBottom: 20,
  },
  cardContainer: {
    width: "95%",
    aspectRatio: 0.8,
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  catImage: {
    width: "100%",
    height: "100%",
  },
  catInfoContainer: {
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "80%",
    alignContent: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: Colors.white,
    marginHorizontal: "10%",
  },
  catMainInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  catText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  catLocation: {
    fontSize: 12,
    color: Colors.grey,
    marginTop: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
    padding: 20,
    marginTop: 40,
    zIndex: 2,
  },
  roundButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

const overlayLabels = {
  left: {
    title: "NOPE",
    style: {
      label: {
        backgroundColor: "red",
        color: "white",
        fontSize: 24,
        borderRadius: 10,
        padding: 10,
      },
      wrapper: {
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        marginTop: 30,
        marginLeft: -30,
      },
    },
  },
  right: {
    title: "LIKE",
    style: {
      label: {
        backgroundColor: "green",
        color: "white",
        fontSize: 24,
        borderRadius: 10,
        padding: 10,
      },
      wrapper: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginTop: 30,
        marginLeft: 30,
      },
    },
  },
};
