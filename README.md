# Bankowość dynamiczna

Główny cel aplikacji stanowi implementacja algorytmu zarządzającego środkami na lokatach użytkownika w celu ich optymalnego przelewania pomiędzy kontami w sposób pozwalający na wygenerowanie możliwie największego zysku.

Aktualnie aplikacja nie zawiera warstwy wizualnej, dlatego poszczególne działania są wyświetlane **w konsoli**. _Na dalszym etapie stworzona zostanie warstwa widoku natomiast wstępnie zarysowana logika może zostać wsparta frameworkami._

Miejscem tworzenia instancji klas oraz uruchamiania głównych metod jest plik **index.js**.

## Stan projektu.

Aktualnie aplikacja wymaga dalszej optymalizacji oraz wyeliminowania błędów. Na tym etapie ma ona charakter **demonstracyjny**, prezentujący moją propozycję rozwiązania problemu rekrutacyjnego. Z tego też względu jestem otwarty na wszelkie propozycje zmian i usprawnień przed wejściem w fazę budowania **właściwej aplikacji** z pełnym backendem i frontendem.

### Klasa `Bank`.

#### Tworzenie instancji.

Klasa ta służy do zakładania poszczególnych kont użytkownika. Utworzenie kolejnych instancji tej klasy wymaga podania `nazwy banku` oraz `początkowego stanu konta`.

#### Randomizacja właściwości.

Wartości dla właściwości `capitalizationCycle` (długość pojedynczego cyklu kapitalizacji odsetek w sekundach), `transferProvision` (procentowa wysokość prowizji za wypłacenie środków z lokaty) oraz `percentage` (oprocentowanie lokaty) są generowane w trakcie działania programu przy użyciu metod losujących dziedziczonych z **klasy uniwersalnej Randomize**.

#### Cykl kapitalizacji i wysokość prowizji.

Zgodnie ze wstępnymi założeniami zadania, `capitalizationCycle` stanowi liczbę całkowitą z przedziału od 5 do 10, natomiast `transferProvision` jest liczbą całkowitą z przedziału od 1 do 15. Wartości te generowane są raz dla każdego założonego konta i nie ulegają zmianom w trakcie działania programu (metody **establishCycleDuration** oraz **getBankProvision**).

#### Oprocentowanie zmienne w czasie.

Z kolei `percentage` ulega cyklicznemu przelosowywaniu wraz z upływem kolejnych `capitalizationCycle`. Jest to liczba zmiennoprzecinkowa większa od 0. **Dla uproszczenia algorytmu przyjąłem dodatkowe założenie, iż maksymalna wysokość oprocentowania wynosi 20, natomiast wynik losowania jest w tym przypadku skracany do dwóch miejsc po przecinku.**

Do nadania pierwszego oprocentowania służy metoda **getBankPercentage**. Z kolei za aktualizację oprocentowania odpowiada metoda **updateBankPercentage**. _W przyszłości do rozważenia ewentualne połączenie tych mechanizmów dla zracjonalizowania kodu._

#### Kapitalizacja.

Kluczową operację w klasie Bank realizuje metoda **calculateState**. Tutaj bowiem wartość środków pieniężnych znajdująca się na koncie (`accountState`) jest powiększana o `wartość oprocentowania`, a wynik skracany **do dwóch miejsc po przecinku**.

Ponieważ na tym etapie aplikacja jest konsolowa, metoda calculateState wyświetla także następujące informacje:

-   nazwę banku i informację o aktualizacji stanu konta,
-   stan konta przed kapitalizacją,
-   wartość kapitalizacji,
-   stan konta po kapitalizacji.

### Klasa `Manager`.

Klasa ta służy do zarządzania przepływami środków pomiędzy kontami oraz raportowania dokonywanych operacji finansowych i ich rezultatów.

#### Odświeżanie mikrosesji.

Metoda **updateFinancialSituation** jest uruchamiana co określony interwał, stanowiący `długość mikrosesji` w naszym systemie, a jej callback stanowi metoda **compareAccountsProfitability**, która jako argument przyjmuje `tablicę zawierającą instancje klasy Bank (banksCollection)`.

#### Poszukiwanie najkorzystniejszej lokaty.

W niej to z kolei następuje w pierwszej kolejności ustalenie `konta z najkorzystniejszym oprocentowaniem` w danym momencie działania programu. Po dokonaniu stosownych operacji uruchamiana jest metoda **transferResourcesBetweenAccounts**, odbierająca jako parametry:

-   wartość najwyższego oprocentowania (`bestPercentageAtThisMoment`),
-   obiekt konta bankowego z najwyższym oprocentowaniem (`bestBankAtThisMoment`),
-   `tablicę zawierającą instancje klasy Bank` (`banksCollection`, przekazane przy wywołania pierwszej metody tego _łańcucha aktualizacyjnego_).

#### Ostateczna decyzja i przelew środków.

W ostatniej z wymienionych wyżej metod program podejmuje ostateczną decyzję w sprawie przelewu środków z kont o niższym oprocentowaniu od najkorzystniejszego. Iterując po przekazanej tablicy obiektów, sprawdzane jest, **czy oprocentowanie w nowym banku przewyższa wysokość prowizji za przelew z lokaty macierzystej** oraz **czy na sprawdzanym koncie są środki** (nie ma bowiem sensu uruchamiania dokonywania transferu wartości zerowej). Jeżeli warunki są spełnione, następuje **dodanie do stanu konta w nowym banku kwoty przelewu z banku macierzystego pomniejszonej o wartość prowizji**. Stan konta w banku macierzystym zostaje natomiast **wyzerowany**, a konsola wyświetla potwierdzenie transferu.

#### Raportowanie działania.

Co określony interwał czasowy uruchamiana jest również metoda **showFinancialSituation**, która w callbacku przyjmuje metodę **reportFinances**, otrzymującą w parametrze `banksCollection`.

Jest to metoda generująca cykliczny wyciąg z naszych kont bankowych. W konsoli wypisywane są `stany kont w poszczególnych bankach`. Nadto wyświetlana jest `łączna kwota posiadanych środków` na moment _drukowania_ wyciągu.
