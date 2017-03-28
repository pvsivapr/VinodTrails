<?php 
//include('../dbconnect.php');

$conn=mysql_connect("mysql3.gear.host","allgives","admin123!");

if(!mysql_connect("mysql3.gear.host","allgives","admin123!"))
{
     die('oops connection problem ! --> '.mysql_error());
}
if(!mysql_select_db("allgives"))
{
     die('oops database selection problem ! --> '.mysql_error());
}

$sql = "CREATE TABLE allgivesregister( ".
       "p_id INT NOT NULL AUTO_INCREMENT, ".
         "reg_name VARCHAR(100) NOT NULL, ".
          "reg_password VARCHAR(1000) NOT NULL, ".
          "reg_email VARCHAR(100) NOT NULL, ".
       "myFile VARCHAR(100) NOT NULL, ".
       "Activate INT NOT NULL,".
        /* "reg_name VARCHAR(100) NOT NULL, ".
          "reg_password VARCHAR(1000) NOT NULL, ".
          "reg_email VARCHAR(100) NOT NULL, ".
         "p_weight INT(10) NOT NULL, ".
          "p_occupation VARCHAR(100) NOT NULL, ".
       "p_place VARCHAR(40) NOT NULL, ".
    "p_date VARCHAR(40) NOT NULL, ".
    "p_health VARCHAR(40) NOT NULL, ".
    "p_medicine VARCHAR(40) NOT NULL, ".
    "p_consult VARCHAR(40) NOT NULL, ".
     "p_duration VARCHAR(40) NOT NULL, ".
     "p_site VARCHAR(40) NOT NULL, ".
     "p_others VARCHAR(40) NOT NULL, ".
     "p_symptoms VARCHAR(40) NOT NULL, ".
     "p_family VARCHAR(40) NOT NULL, ".
     "p_greasy VARCHAR(40) NOT NULL, ".
     "p_gre_medicine VARCHAR(40) NOT NULL, ".
     "p_dandduff VARCHAR(40) NOT NULL, ".
     "p_recent VARCHAR(40) NOT NULL, ".
     "p_cosmetics VARCHAR(40) NOT NULL, ".
     "p_remidies VARCHAR(40) NOT NULL, ".
     "p_regularly VARCHAR(40) NOT NULL, ".
     "p_anything VARCHAR(40) NOT NULL, ".
     "p_file VARCHAR(40) NOT NULL, ".*/
       "PRIMARY KEY ( p_id )); ";
mysql_select_db( 'allgives' );
$retval = mysql_query( $sql, $conn );
if(! $retval )
{
  die('Could not create table: ' . mysql_error());
}
echo "Table created successfully\n";
?>