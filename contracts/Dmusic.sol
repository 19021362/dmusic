pragma solidity ^0.8.0;

contract Dmusic {
    uint256 audienceIDTracker;
    uint256 artistIDTracker;
    uint256 songIDTracker;

    struct Artist {
        string name;
        uint256 artistID;
        uint256[] songsPublished;
    }

    struct Audience {
        string name;
        uint256 audienceID;
        uint256[] songsPurchased;
        mapping(uint256 => bool) isSongPurchased;
    }

    struct Song {
        string songName;
        string artistName;
        string genre;
        string hash;
        uint256 songID;
        uint256 price;
        address payable artistAddress;
    }

    mapping(address => bool) identifyUser;
    mapping(address => bool) identifyArtist;
    mapping(address => Artist) allArtists;
    mapping(address => Audience) allAudience;
    mapping(uint256 => Song) allSongs;
    mapping(uint256 => uint256) timesSongPurchased;
    mapping(string => bool) songHashUsed;
    mapping(uint256 => address payable) getArtistAddress;

    constructor() {
        audienceIDTracker = 0;
        artistIDTracker = 0;
        songIDTracker = 0;
    }

    function getNumSongs() public view returns (uint256) {
        return songIDTracker;
    }

    function checkUser() public view returns (bool) {
        return identifyUser[msg.sender];
    }

    function checkArtist() public view returns (bool) {
        return identifyArtist[msg.sender];
    }

    function addNewArtist() public {
        Audience storage user = allAudience[msg.sender];
        artistIDTracker += 1;
        Artist memory newArtist;
        newArtist.name = user.name;
        newArtist.artistID = artistIDTracker;
        getArtistAddress[artistIDTracker] = payable(msg.sender);

        allArtists[msg.sender] = newArtist;

        identifyArtist[msg.sender] = true;
    }

    function addNewAudience(string memory _name) public {
        audienceIDTracker += 1;

        Audience storage newAudience = allAudience[msg.sender];
        newAudience.name = _name;
        newAudience.audienceID = audienceIDTracker;

        identifyUser[msg.sender] = true;
    }

    function getAudienceDetails()
        public
        view
        returns (
            string memory,
            uint256,
            uint256[] memory
        )
    {
        return (
            allAudience[msg.sender].name,
            allAudience[msg.sender].audienceID,
            allAudience[msg.sender].songsPurchased
        );
    }

    function getArtistDetails()
        public
        view
        returns (
            string memory,
            uint256,
            uint256[] memory
        )
    {
        return (
            allArtists[msg.sender].name,
            allArtists[msg.sender].artistID,
            allArtists[msg.sender].songsPublished
        );
    }

    event songAdded(
        uint256 songID,
        string songName,
        string artistName,
        uint256 price
    );

    function addSong(
        string memory _name,
        string memory _genre,
        string memory _hash,
        uint256 _price
    ) public {
        require(identifyUser[msg.sender] == true, "Not an user.");
        require(
            !songHashUsed[_hash],
            "Duplicate detected. Song hash already in use."
        );

        songIDTracker += 1;

        Song memory newSong;
        newSong.songID = songIDTracker;
        newSong.songName = _name;
        newSong.artistName = allArtists[msg.sender].name;
        newSong.genre = _genre;
        newSong.hash = _hash;
        newSong.price = _price;
        newSong.artistAddress = payable(msg.sender);

        timesSongPurchased[songIDTracker] = 0;

        allSongs[songIDTracker] = newSong;
        allArtists[msg.sender].songsPublished.push(songIDTracker);
        songHashUsed[_hash] = true;

        emit songAdded(
            newSong.songID,
            newSong.songName,
            newSong.artistName,
            newSong.price
        );
    }

    event songPurchased(
        uint256 songID,
        string songName,
        string audienceName,
        uint256 price
    );

    function buySong(uint256 _songID) public payable {
        require(
            identifyUser[msg.sender] == true,
            "Not an user."
        );
        require(
            !allAudience[msg.sender].isSongPurchased[_songID],
            "Cannot buy the song twice."
        );

        require(msg.sender.balance > allSongs[_songID].price, "Insufficient balance.");

        allSongs[_songID].artistAddress.transfer(allSongs[_songID].price);
        timesSongPurchased[_songID] += 1;

        allAudience[msg.sender].songsPurchased.push(_songID);
        allAudience[msg.sender].isSongPurchased[_songID] = true;

        emit songPurchased(
            allSongs[_songID].songID,
            allSongs[_songID].songName,
            allAudience[msg.sender].name,
            allSongs[_songID].price
        );
    }

    event artistDonated(string artistName, string audienceName, uint256 amount);

    function donateArtist(uint256 _artistIDTracker, uint256 _amount) public payable {
        require(
            identifyUser[msg.sender] == true,
            "Not an user."
        );

        address artistAddress = payable(getArtistAddress[_artistIDTracker]);
        Artist memory artist = allArtists[artistAddress];

        require(msg.sender.balance > _amount, "Insufficient balance.");

        getArtistAddress[_artistIDTracker].transfer(_amount);

        emit artistDonated(artist.name, allAudience[msg.sender].name, _amount);
    }

    function getSongDetails(uint256 _songID)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256
        )
    {
        return (
            allSongs[_songID].songName,
            allSongs[_songID].artistName,
            allSongs[_songID].genre,
            allSongs[_songID].hash,
            allSongs[_songID].price,
            timesSongPurchased[_songID]
        );
    }
}
