<?php
 
        // Zend library include path
        $clientLibraryPath = "/Users/evieliu/Sites/php-test/php/ZendGdata/library"; 
        set_include_path(get_include_path() . PATH_SEPARATOR . $clientLibraryPath);
             
        include_once("/Users/evieliu/Sites/php-test/php/Google_Spreadsheet.php");
         
        $u = "eviexing@gmail.com";
        $p = "01e17pjs";
         
        $ss = new Google_Spreadsheet($u,$p);
        $ss->useSpreadsheet("poll-test");
        //$ss->useWorksheet("wks2");
         
                $q1 = "q1" ;
        $q2 = "q2" ;
        $q3 = "q3" ;

        $Q1row = $ss->getRows('question="q1"');

        $Q1cellA = $Q1row[0][a];
        $Q1cellB = $Q1row[0][b];
        $Q1cellC = $Q1row[0][c];
        $Q1cellD = $Q1row[0][d];

        function Q1addA() {
            global $Q1cellA, $q1, $ss;
            $Q1cellA++;
            echo $Q1cellA;
            $row = array
                (
                "a" => $Q1cellA,
                );
        $ss->updateRow($row,"question=".$q1);
        }

        Q1addA();


    ?>