export const genreIdToText = function (genreId, type) {
  if (type.toLowerCase() === "movie") {
    switch (genreId) {
      case 28:
        return "Action";
      case 12:
        return "Adventure";
      case 16:
        return "Animation";

      case 35:
        return "Comedy";

      case 80:
        return "Crime";

      case 99:
        return "Documentary";
      case 18:
        return "Drama";
      case 10751:
        return "Family";
      case 14:
        return "Fantasy";
      case 36:
        return "History";
      case 27:
        return "Horror";
      case 10402:
        return "Music";
      case 9648:
        return "Mystery";
      case 10749:
        return "Romance";
      case 878:
        return "Science Fiction";
      case 10770:
        return "TV Movie ";
      case 53:
        return "Thriller";
      case 10752:
        return "War";
      case 37:
        return "Western";
      default:
        return "";
    }
  }
  if (type.toLowerCase() === "tv series" || type.toLowerCase() === "tv") {
    switch (genreId) {
      case 10759:
        return "Action & Adventure";
      case 16:
        return "Animation";
      case 35:
        return "Comedy";

      case 80:
        return "Crime";

      case 99:
        return "Documentary";

      case 18:
        return "Drama";

      case 10751:
        return "Family";
      case 10762:
        return "Kids";
      case 9648:
        return "Mystery";
      case 10763:
        return "News";
      case 10764:
        return "Reality";

      case 10765:
        return "Sci-Fi & Fantasy";
      case 10766:
        return "Soap";
      case 10767:
        return "Talk";
      case 10768:
        return "War & Politics";
      case 37:
        return "Western";

      default:
        return "";
    }
  }
};

export function extractRatingInfo(ratedCode) {
  switch (ratedCode) {
    case "G":
      return "All ages admitted";
    case "PG":
      return 'Some material may not be suitable for children. Parents urged to give "parental guidance"';
    case "PG-13":
      return "Some material may be inappropriate for children under 13. Parents are urged to be cautious";
    case "R":
      return "Under 17 requires accompanying parent or adult guardian. Contains some adult material.";
    case "NC-17":
      return "No one 17 and under admitted. Clearly adult. Children are not admitted.";
    case "TV-Y":
      return "This program is designed to be appropriate for all children.including children from ages 2-6. ";
    case "TV-Y7":
      return "This program is designed for children age seven and above.";
    case "TV-Y7 FV":
      return "This program is designed for children age seven and abov, fantasy violence may be more intense or more combative.";
    case "TV-G":
      return "Most parents would find this program suitable for all ages.";
    case "TV-PG":
      return "This program contains material that parents may find unsuitable for younger children.";
    case "TV-14":
      return "This program contains some material that many parents would find unsuitable for children under 14 years of age";
    case "TV-MA":
      return "This program is specifically designed to be viewed by adults and therefore may be unsuitable for children under 17.";
    default:
      return "There is no enough information about this program ";
  }
}
