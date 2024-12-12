const cityData = {
    london: {
        name: 'London',
        description: 'Explore London, a vibrant and cosmopolitan city with centuries of history.',
        cityImage: '/cities/images/Images/london.jpg',
        attractions: [
            {
                name: 'Big Ben',
                image: '/cities/images/Images/big_ben.jpg',
                description: 'The famous clock tower in London.'
            },
            {
                name: 'Tower Bridge',
                image: '/cities/images/Images/tower_bridge.jpg',
                description: 'A combined bascule and suspension bridge in London.'
            },
            {
                name: 'Buckingham Palace',
                image: '/cities/images/Images/buckingham_palace.jpg',
                description: 'The residence of the British monarch.'
            }
        ]
    },
    paris: {
        name: 'Paris',
        description: 'Experience the romance and charm of Paris, the City of Light.',
        cityImage: '/cities/images/Images/paris.jpg',
        attractions: [
            {
                name: 'Eiffel Tower',
                image: '/cities/images/Images/eiffel_tower.jpg',
                description: 'An iron lattice tower located on the Champ de Mars in Paris.'
            },
            {
                name: 'Louvre Museum',
                image: '/cities/images/Images/louvre.jpg',
                description: 'The world\'s largest art museum and a historic monument in Paris.'
            },
            {
                name: 'Notre-Dame Cathedral',
                image: '/cities/images/Images/notre_dame.jpg',
                description: 'A medieval Catholic cathedral considered to be one of the finest examples of French Gothic architecture.'
            }
        ]
    },
    tokyo: {
        name: 'Tokyo',
        description: 'Experience the blend of tradition and modernity in Tokyo, Japan\'s bustling capital.',
        cityImage: '/cities/images/Images/tokyo.jpg',
        attractions: [
            {
                name: 'Tokyo Tower',
                image: '/cities/images/Images/tokyo_tower.jpg',
                description: 'A communications and observation tower in the Shiba-koen district of Minato, Tokyo.'
            },
            {
                name: 'Shibuya Crossing',
                image: '/cities/images/Images/shibuya_crossing.jpg',
                description: 'Famous intersection in the Shibuya district of Tokyo.'
            },
            {
                name: 'Meiji Shrine',
                image: '/cities/images/Images/meiji_shrine.jpg',
                description: 'A Shinto shrine dedicated to the deified spirits of Emperor Meiji and his wife, Empress Shōken.'
            }
        ]
    },
    sydney: {
        name: 'Sydney',
        description: 'Visit Sydney, known for its stunning harbor, beaches, and landmarks.',
        cityImage: '/cities/images/Images/sydney.jpg',
        attractions: [
            {
                name: 'Sydney Opera House',
                image: '/cities/images/Images/sydney_opera_house.jpg',
                description: 'A multi-venue performing arts centre in Sydney, New South Wales, Australia.'
            },
            {
                name: 'Sydney Harbour Bridge',
                image: '/cities/images/Images/sydney_harbour_bridge.jpg',
                description: 'A steel through arch bridge across Sydney Harbour that carries rail, vehicular, bicycle, and pedestrian traffic.'
            },
            {
                name: 'Bondi Beach',
                image: '/cities/images/Images/bondi_beach.jpg',
                description: 'A popular beach located 7 km east of the Sydney central business district.'
            }
        ]
    },
    toronto: {
        name: 'Toronto',
        description: 'Explore Toronto, Canada\'s largest city, known for its diversity and vibrant culture.',
        cityImage: '/cities/images/Images/toronto.jpg',
        attractions: [
            {
                name: 'CN Tower',
                image: '/cities/images/Images/cn_tower.jpg',
                description: 'A concrete communications and observation tower located in downtown Toronto.'
            },
            {
                name: 'Royal Ontario Museum',
                image: '/cities/images/Images/royal_ontario_museum.jpg',
                description: 'One of the largest museums in North America, encompassing world culture and natural history.'
            },
            {
                name: 'Toronto Islands',
                image: '/cities/images/Images/toronto_islands.jpg',
                description: 'A group of small islands in Lake Ontario, providing parkland, a public beach, and many attractions.'
            }
        ]
    },
    dubai: {
        name: 'Dubai',
        description: 'Discover Dubai, a city of luxury, skyscrapers, and endless shopping and entertainment options.',
        cityImage: '/cities/images/Images/dubai.jpg',
        attractions: [
            {
                name: 'Burj Khalifa',
                image: '/cities/images/Images/burj_khalifa.jpg',
                description: 'The tallest building in the world, located in the heart of Dubai.'
            },
            {
                name: 'Dubai Mall',
                image: '/cities/images/Images/dubai_mall.jpg',
                description: 'The world\'s largest shopping mall by total area.'
            },
            {
                name: 'Palm Jumeirah',
                image: '/cities/images/Images/palm_jumeirah.jpg',
                description: 'An artificial archipelago in the shape of a palm tree in Dubai.'
            }
        ]
    },
    hong_kong: {
        name: 'Hong Kong',
        description: 'Visit Hong Kong, a vibrant city known for its skyline, harbor, and cultural diversity.',
        cityImage: '/cities/images/Images/hong_kong.jpg',
        attractions: [
            {
                name: 'Victoria Peak',
                image: '/cities/images/Images/victoria_peak.jpg',
                description: 'A hill on the western half of Hong Kong Island with a view of Central, Victoria Harbour, and Lamma Island.'
            },
            {
                name: 'Tsim Sha Tsui',
                image: '/cities/images/Images/tsim_sha_tsui.jpg',
                description: 'An urban area in southern Kowloon, known for shopping, nightlife, and the Hong Kong skyline view.'
            },
            {
                name: 'Hong Kong Disneyland',
                image: '/cities/images/Images/hong_kong_disneyland.jpg',
                description: 'A theme park located on reclaimed land in Penny\'s Bay, Lantau Island, Hong Kong.'
            }
        ]
    },
    singapore: {
        name: 'Singapore',
        description: 'Explore Singapore, a city-state known for its cleanliness, greenery, and futuristic skyline.',
        cityImage: '/cities/images/Images/singapore.jpg',
        attractions: [
            {
                name: 'Marina Bay Sands',
                image: '/cities/images/Images/marina_bay_sands.jpg',
                description: 'An integrated resort fronting Marina Bay in Singapore, famous for its infinity pool and views.'
            },
            {
                name: 'Gardens by the Bay',
                image: '/cities/images/Images/gardens_by_the_bay.jpg',
                description: 'A nature park spanning 101 hectares in the Central Region of Singapore, adjacent to the Marina Reservoir.'
            },
            {
                name: 'Sentosa Island',
                image: '/cities/images/Images/sentosa_island.jpg',
                description: 'A resort island in Singapore, known for its Universal Studios theme park and other attractions.'
            }
        ]
    },
    san_francisco: {
        name: 'San Francisco',
        description: 'Visit San Francisco, a city known for its iconic landmarks, steep hills, and tech scene.',
        cityImage: '/cities/images/Images/san_francisco.jpg',
        attractions: [
            {
                name: 'Golden Gate Bridge',
                image: '/cities/images/Images/golden_gate_bridge.jpg',
                description: 'A suspension bridge spanning the Golden Gate, the strait connecting San Francisco Bay and the Pacific Ocean.'
            },
            {
                name: 'Alcatraz Island',
                image: '/cities/images/Images/alcatraz.jpg',
                description: 'The site of the notorious former prison, located on an island in San Francisco Bay.'
            },
            {
                name: 'Fisherman\'s Wharf',
                image: '/cities/images/Images/fishermans_wharf.jpg',
                description: 'A popular waterfront area of San Francisco, known for its historic ships and seafood restaurants.'
            }
        ]
    },
    berlin: {
        name: 'Berlin',
        description: 'Discover the rich history and culture of Berlin, the heart of Germany.',
        cityImage: '/cities/images/Images/berlin.jpg',
        attractions: [
            {
                name: 'Brandenburg Gate',
                image: '/cities/images/Images/brandenburg_gate.jpg',
                description: 'An iconic symbol of Berlin and Germany\'s reunification.'
            },
            {
                name: 'Berlin Wall',
                image: '/cities/images/Images/berlin_wall.jpg',
                description: 'The historic wall that divided East and West Berlin.'
            },
            {
                name: 'Museum Island',
                image: '/cities/images/Images/museum_island.jpg',
                description: 'A UNESCO World Heritage Site with five world-class museums.'
            }
        ]
    },
    los_angeles: {
        name: 'Los Angeles',
        description: 'Explore Los Angeles, the entertainment capital of the world and home to Hollywood.',
        cityImage: '/cities/images/Images/los_angeles.jpg',
        attractions: [
            {
                name: 'Hollywood Sign',
                image: '/cities/images/Images/hollywood_sign.jpg',
                description: 'An American landmark and cultural icon overlooking Hollywood, Los Angeles.'
            },
            {
                name: 'Santa Monica Pier',
                image: '/cities/images/Images/santa_monica_pier.jpg',
                description: 'A large double-jointed pier located at the foot of Colorado Avenue in Santa Monica, California.'
            },
            {
                name: 'Griffith Observatory',
                image: '/cities/images/Images/griffith_observatory.jpg',
                description: 'An observatory on the south-facing slope of Mount Hollywood in Los Angeles\' Griffith Park.'
            }
        ]
    },
    new_york: {
        name: 'New York',
        description: 'Discover the city that never sleeps, New York, with its iconic skyline and diverse culture.',
        cityImage: '/cities/images/Images/new_york.jpg',
        attractions: [
            {
                name: 'Statue of Liberty',
                image: '/cities/images/Images/statue_of_liberty.jpg',
                description: 'A colossal neoclassical sculpture on Liberty Island in New York Harbor.'
            },
            {
                name: 'Times Square',
                image: '/cities/images/Images/times_square.jpg',
                description: 'A major commercial intersection, tourist destination, entertainment center, and neighborhood in Midtown Manhattan, New York City.'
            },
            {
                name: 'Central Park',
                image: '/cities/images/Images/central_park.jpg',
                description: 'An urban park in New York City, located between the Upper West and Upper East Sides of Manhattan.'
            }
        ]
    }
};
 module.exports = cityData; // Make sure you are exporting the data
  