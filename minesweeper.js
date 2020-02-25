/**
 * @param {A 2-D array passed in by the browser} driver_array 
 * @param {A function passed in by the browser; returns the board-object} p 
 */
function Minesweeper(driver_array, get_board) {

    var the_game = this;

    var game_type_id;

    var num_rows;

    var num_collumns;

    var num_mines;

    var resize_factor;

    var current_num_mines;

    /**
     * The number of square that DON'T contain mines
     */
    var num_non_mines;

    var square_object_array_1;

    var square_object_array_2;

    var counters_object_instance = new counters_object();

    var H;

    var h;

    var a;

    var Q;

    var square_object_array_3;

    var q;

    var is_old_Internet_Explorer;

    var z;

    var f;

    var t;

    var touchpoint_identifier;

    var y;

    initialization_function();

    this.newGame = function () {
        var Y, W;

        var V, X;

        var board_object;

        V = get_num_rows_columns_mines_string();

        board_object = get_board();

        game_type_id = board_object.gameTypeId;

        num_rows = board_object.numRows;

        num_collumns = board_object.numCols;

        num_mines = board_object.numMines;

        resize_factor = board_object.zoom;

        X = (get_num_rows_columns_mines_string() != V);

        change_height_and_width(resize_factor);

        if (X) { 
            R() 
        } 
        
        // Plants the mines
        plant_mines();

        if (!X) {
            for (Y = 1; Y <= num_rows; Y++) {
                for (W = 1;

                    W <= num_collumns;

                    W++) { square_object_array_1[Y][W].setClass("square blank") }
            }
        } counters_object_instance.stop();

        counters_object_instance.reset();

        current_num_mines = num_mines;

        num_non_mines = num_rows * num_collumns - num_mines;

        create_num_mines_html_classnames();

        H = false;

        h = false;

        a = 0;

        Q = 0;

        z = false;

        f = false;

        t = false;

        isMouseDownForCtrlClick = false;

        touchpoint_identifier = null;

        y = false;

        $("#face")[0].className = "facesmile";

        hoveredSquareId = ""
    };

    /**
     * Resizes the board 
     */
    this.resize = function (resize_factor_param) {

        var margin_size = calculate_margin(resize_factor_param);

        change_height_and_width(resize_factor_param);

        $("#game-container").removeClass("z" + resize_factor * 100).addClass("z" + resize_factor_param * 100);

        $("#face").css({ "margin-left": Math.floor(margin_size) + "px", "margin-right": Math.ceil(margin_size) + "px" });

        resize_factor = resize_factor_param
    };


    function change_height_and_width(resize_factor_param) {

        $("#game-container, #game").width(resize_factor_param * (num_collumns * 16 + 20));

        $("#game").height(resize_factor_param * (num_rows * 16 + 30 + 26 + 6))
    } 
    
    function calculate_margin(resize_factor_param) { 

        return (resize_factor_param * num_collumns * 16 - 6 * Math.ceil(resize_factor_param * 13) - resize_factor_param * 2 * 6 - resize_factor_param * 26) / 2 
    } 
        
    function get_num_rows_columns_mines_string() { 

        return num_rows + "_" + num_collumns + "_" + num_mines 
    } 
        
    function R() {

        /**
         * For iterating through the rows and collumns
         */
        var row_index, collumn_index;

        /**
         * Contains all the html for the board
         */
        var board_html_array = [];

        var margin_size = calculate_margin(resize_factor);

        board_html_array.push('<div class="bordertl"></div>');

        for (collumn_index = 0; collumn_index < num_collumns; collumn_index++) { board_html_array.push('<div class="bordertb"></div>') } board_html_array.push('<div class="bordertr"></div>');

        board_html_array.push('<div class="borderlrlong"></div>', '<div class="time0" id="mines_hundreds"></div>', '<div class="time0" id="mines_tens"></div>', '<div class="time0" id="mines_ones"></div>', '<div class="facesmile" style="margin-left:', Math.floor(margin_size), "px; margin - right: ",Math.ceil(margin_size),'px; " id="face"></div>','<div class="time0" id="seconds_hundreds"></div>','<div class="time0" id="seconds_tens"></div>','<div class="time0" id="seconds_ones"></div>','<div class="borderlrlong"></div>');

        board_html_array.push('<div class="borderjointl"></div>');

        for (collumn_index = 0; collumn_index < num_collumns; collumn_index++) {

            board_html_array.push('<div class="bordertb"></div>')
        } 
        
        board_html_array.push('<div class="borderjointr"></div>');


        // RAFA Generates the rows of squares
        for (row_index = 1; row_index <= num_rows; row_index++) {

            board_html_array.push('<div class="borderlr"></div>');

            for (collumn_index = 1; collumn_index <= num_collumns; collumn_index++) {

                board_html_array.push('<div class="square blank" id="', row_index, "_", collumn_index, '"></div>')
            }

            board_html_array.push('<div class="borderlr"></div>')
        }

        board_html_array.push('<div class="borderbl"></div>');

        for (collumn_index = 0; collumn_index < num_collumns; collumn_index++) { 
            board_html_array.push('<div class="bordertb"></div>') 
        } 
        
        board_html_array.push('<div class="borderbr"></div>');

        for (collumn_index = 0; collumn_index <= num_collumns + 1; collumn_index++) {
            board_html_array.push('<div class="square blank" style="display: none;" id="',0,"_",collumn_index,'"></div>')
        }
            
        for(collumn_index=0; collumn_index <= num_collumns + 1; collumn_index++) {
            
            board_html_array.push('<div class="square blank" style="display: none;" id="',num_rows+1,"_",collumn_index,'"></div>')
        }
                
        for(row_index=1; row_index <= num_rows; row_index++) {
            
            board_html_array.push('<div class="square blank" style="display: none;" id="',row_index,"_",0,'"></div>');

            board_html_array.push('<div class="square blank" style="display: none;" id="',row_index,"_",num_collumns+1,'"></div>')
        }
    
    $("#game").html(board_html_array.join(""))
}

                function squareObject(row, collumn) {

                    /**
                     * Dual purpose:
                     * 
                     * 1) The number that appears on the square
                     * 
                     * 2) If negative, the square contains a mine!
                     */
                    var square_object_value = 0;

                    var is_flagged = false;

                    var is_marked = false;

                    var is_revealed = false;

                    this.addToValue = function (add_value) { square_object_value += add_value };

                    this.isMine = function () {
                        return square_object_value < 0
                    };

                    this.isFlagged = function () { return is_flagged };

                    this.isMarked = function () { return is_marked };

                    this.isRevealed = function () { return is_revealed };

                    this.isHidden = function () { return row < 1 || row > num_rows || collumn < 1 || collumn > num_collumns };

                    this.getRow = function () { return row };

                    this.getCol = function () { return collumn };

                    this.getValue = function () { return square_object_value };

                    this.setRevealed = function (reveal) { is_revealed = reveal };

                    /**
                     * Plants a mine and increases the numbers of all the surrounding squares by 1
                     */
                    this.plantMine = function () {

                        // RAFA negative 'X' means it's a mine!
                        square_object_value -= 10;

                        square_object_array_1[row - 1][collumn - 1].addToValue(1);

                        square_object_array_1[row - 1][collumn].addToValue(1);

                        square_object_array_1[row - 1][collumn + 1].addToValue(1);

                        square_object_array_1[row][collumn - 1].addToValue(1);

                        square_object_array_1[row][collumn + 1].addToValue(1);

                        square_object_array_1[row + 1][collumn - 1].addToValue(1);

                        square_object_array_1[row + 1][collumn].addToValue(1);

                        square_object_array_1[row + 1][collumn + 1].addToValue(1)
                    };

                    this.unplantMine = function () {
                        square_object_value += 10;

                        square_object_array_1[row - 1][collumn - 1].addToValue(-1);

                        square_object_array_1[row - 1][collumn].addToValue(-1);

                        square_object_array_1[row - 1][collumn + 1].addToValue(-1);

                        square_object_array_1[row][collumn - 1].addToValue(-1);

                        square_object_array_1[row][collumn + 1].addToValue(-1);

                        square_object_array_1[row + 1][collumn - 1].addToValue(-1);

                        square_object_array_1[row + 1][collumn].addToValue(-1);

                        square_object_array_1[row + 1][collumn + 1].addToValue(-1)
                    };

                    this.setClass = function (class_name) { 

                        document.getElementById(row + "_" + collumn).className = class_name 
                    };

                    /**
                     * Reveals a single square
                     * @returns true if the square is safe
                     * @returns false if the square was mined
                     */
                    this.reveal1 = function () {
                        var row_offset, collumn_offset;

                        var this_square_object, offset_square_object;

                        var square_object_singleton_array = [];

                        square_object_singleton_array.push(this);

                        this.pushed = true;

                        while (square_object_singleton_array.length > 0) {
                            this_square_object = square_object_singleton_array.pop();

                            if (!this_square_object.isRevealed() && !this_square_object.isFlagged()) {

                                if (this_square_object.isMine()) {

                                    return false 
                                } 
                                else {
                                    if (!this_square_object.isFlagged()) {

                                        this_square_object.setClass("square open" + this_square_object.getValue());

                                        this_square_object.setRevealed(true);

                                        if (this_square_object.getValue() == 0) { a++ } else { Q++ } if (!this_square_object.isHidden() && --num_non_mines == 0) {
                                            you_win();

                                            return true
                                        } if (this_square_object.getValue() == 0 && !this_square_object.isHidden()) {
                                            for (row_offset = -1; row_offset <= 1; row_offset++) {
                                                    for (collumn_offset = -1; collumn_offset <= 1; collumn_offset++) {

                                                        offset_square_object = square_object_array_1[this_square_object.getRow() + row_offset][this_square_object.getCol() + collumn_offset];

                                                        if (!offset_square_object.pushed && !offset_square_object.isHidden() && !offset_square_object.isRevealed()) {
                                                            
                                                            square_object_singleton_array.push(offset_square_object);

                                                            offset_square_object.pushed = true
                                                        }
                                                    }
                                            }
                                        }
                                    }
                                }
                            }
                        } 
                        
                        return true
                    };


                    this.reveal9 = function () {

                        // (only works if the square is already revealed)
                        if (is_revealed) {

                            var row_offset, collumn_offset;

                            var square_object;

                            var num_adjacent_flags = 0;

                            /**
                             * An array of squares containing all the mines you just blew up!
                             */
                            var exploding_squares = [];

                            for (row_offset = -1; row_offset <= 1; row_offset++) {

                                    for (collumn_offset = -1; collumn_offset <= 1; collumn_offset++) {

                                        square_object = square_object_array_1[row + row_offset][collumn + collumn_offset];

                                        if (square_object != this && square_object.isFlagged()) { 
                                            
                                            num_adjacent_flags++ 
                                        }
                                    }

                            } 
                            
                            // If the number in the square matches the number of adjacent flags, 
                            // Reveal the rest of the squares!
                            if (num_adjacent_flags == square_object_value) {

                                for (row_offset = -1; row_offset <= 1; row_offset++) {
                                        for (collumn_offset = -1; collumn_offset <= 1; collumn_offset++) {
                                                square_object = square_object_array_1[row + row_offset][collumn + collumn_offset];

                                            // If one of the squares contains a mine,
                                            if (square_object != this && !square_object.reveal1()) { 

                                                exploding_squares.push(square_object) 
                                            }
                                        }
                                } 
                                if (exploding_squares.length > 0) { 

                                    you_lose(exploding_squares) 
                                }
                            }
                        }
                    };

                    this.flag = function (aa) {

                        if (!is_revealed) {
                            if (is_flagged) {

                                // If the "marks" box is checked,
                                if ($("#marks").attr("checked")) {

                                    // Square question marks the square with a question-mark!
                                    this.setClass("square question");

                                    is_marked = true
                                } 
                                
                                else {
                                    this.setClass("square blank");

                                    if (aa) { 
                                        this._showFlagAnimation(true) 
                                    }

                                } 
                                
                                is_flagged = false;

                                current_num_mines++;

                                create_num_mines_html_classnames()
                            } else {
                                if (is_marked) {
                                    this.setClass("square blank");

                                    is_marked = false
                                } else {
                                    this.setClass("square bombflagged");

                                    is_flagged = true;

                                    current_num_mines--;

                                    create_num_mines_html_classnames();

                                    if (aa) { this._showFlagAnimation() }
                                }
                            }
                        }
                    };

                    this._showFlagAnimation = function (ab) {

                        /**
                         * A square gotten by its id
                         */
                        var square_html = $("#" + row + "_" + collumn);

                        var square_html_offset = square_html.offset();

                        var square_html_horizontal_center = square_html_offset.left + square_html.width() / 2;

                        var square_html_vertical_center = square_html_offset.top + square_html.height() / 2;

                        var ak = 57 * resize_factor * 1.75;

                        var ad = 79 * resize_factor * 1.75;

                        var aa = { left: square_html_horizontal_center - ak / 2, top: square_html_vertical_center - ad / 2, width: ak + "px", height: ad + "px", opacity: 0 };

                        var ai = { left: square_html_horizontal_center, top: square_html_vertical_center, width: 0, height: 0, opacity: 1 };

                        // Swaps aa and ai
                        if (ab) {

                            var aj = aa;

                            aa = ai;

                            ai = aj
                        } 
                        
                        var ag = $('<img src="flag.png" class="flag-animation"></div>').css(aa);

                        $("body").append(ag);

                        setTimeout(function () { ag.css(ai) }, 0);

                        setTimeout(function () { ag.remove() }, 500)
                    }

                }


                function plant_mines() {

                    var row, collumn, num_mines_index;

                    var square_object;

                    square_object_array_1 = [];

                    square_object_array_2 = [];

                    square_object_array_3 = [];

                    /**
                     * Just an index for iterating through an array of mines
                     */
                    num_mines_index = 0;

                    for (row = 0; row <= num_rows + 1; row++) {

                        square_object_array_1[row] = [];

                        for (collumn = 0; collumn <= num_collumns + 1; collumn++) {

                            square_object = new squareObject(row, collumn);

                            square_object_array_1[row][collumn] = square_object;

                            square_object_array_2[row + "_" + collumn] = square_object;

                            if (!square_object.isHidden()) {

                                square_object_array_3[num_mines_index++] = square_object
                            }

                        }
                    }

                    for (num_mines_index = 0; num_mines_index < num_mines; num_mines_index++) {

                        // RAFA Plants the mines!
                        // Removes a single square_object from square_objects_3 and plants the mine there
                        square_object_array_3.splice(Math.floor(Math.random() * square_object_array_3.length), 1)[0].plantMine()
                    }
                }


                function fix_mines(fix_mines_square_object) {

                    var fix_mines_square_object_row = fix_mines_square_object.getRow();

                    var fix_mines_square_object_collumn = fix_mines_square_object.getCol();

                    var row_offset, collumn_offset;

                    var square_object_to_be_demined;

                    var fix_mines_nonadjacent_square_object_array;

                    var fix_mines_square_object_array;

                    if (fix_mines_square_object.isMine()) {

                        // Plants a single mine
                        // Probably for some edge-case
                        square_object_array_3.splice(Math.floor(Math.random() * square_object_array_3.length), 1)[0].plantMine();

                        fix_mines_square_object.unplantMine();

                        square_object_array_3.push(fix_mines_square_object)
                    }

                    var fix_mines_nonadjacent_square_object_array = [];

                    for (var X = 0; X < square_object_array_3.length; X++) {

                        fix_mines_square_object_array = square_object_array_3[X];

                        if (fix_mines_square_object_array.getRow() < fix_mines_square_object_row - 1 || fix_mines_square_object_array.getRow() > fix_mines_square_object_row + 1 || fix_mines_square_object_array.getCol() < fix_mines_square_object_collumn - 1 || fix_mines_square_object_array.getCol() > fix_mines_square_object_collumn + 1) {
                            
                            // Creates a list of all the square_objects OVER 1 row above or below
                            // and OVER 1 collumn before or after the given square_object
                            fix_mines_nonadjacent_square_object_array.push(fix_mines_square_object_array)
                        }

                    }

                    // Fixes the mines with an algorithm
                    // Iterates through 1 row above & below, and 1 collumn before & after the given square_object
                    for (row_offset = -1; row_offset <= 1; row_offset++) {

                        for (collumn_offset = -1; collumn_offset <= 1; collumn_offset++) {

                            square_object_to_be_demined = square_object_array_1[fix_mines_square_object_row + row_offset][fix_mines_square_object_collumn + collumn_offset];

                            // For every mine it plants, it unplants one
                            if (square_object_to_be_demined.isMine() && fix_mines_nonadjacent_square_object_array.length > 0) {

                                fix_mines_nonadjacent_square_object_array.splice(Math.floor(Math.random() * fix_mines_nonadjacent_square_object_array.length), 1)[0].plantMine();

                                square_object_to_be_demined.unplantMine()
                            }
                        }
                    }

                    counters_object_instance.start();

                    if ((fix_mines_square_object_row == 1 && fix_mines_square_object_collumn == 1) || (fix_mines_square_object_row == 1 && fix_mines_square_object_collumn == num_collumns) || (fix_mines_square_object_row == num_rows && fix_mines_square_object_collumn == 1) || (fix_mines_square_object_row == num_rows && fix_mines_square_object_collumn == num_collumns)) { return 1 } else { if (fix_mines_square_object_row == 1 || fix_mines_square_object_row == num_rows || fix_mines_square_object_collumn == 1 || fix_mines_square_object_collumn == num_collumns) { return 2 } else { return 3 } }
                }

                function T(U) {
                    if (game_type_id > 0) {
                        k();

                        $.post("start.php", { key: q, s: U, zc: a, nzc: Q })
                    }
                } 
                
                function k() {
                    var U = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                    var V;

                    q = "";

                    for (var V = 0;

                        V < 3;

                        V++) { q += U.charAt(Math.floor(Math.random() * U.length)) } q += 4 * (Math.floor(Math.random() * 225) + 25) + game_type_id;

                    for (var V = 0;

                        V < 4;

                        V++) { q += U.charAt(Math.floor(Math.random() * U.length)) }
                } 
                
                function counters_object() {

                    /**
                     * Time in milliseconds when the game starts
                     */
                    var initial_time;

                    /**
                     * The number of times "timerHandler()" has been called
                     */
                    var num_time_handled;

                    /**
                     * returned by library function "setTimeout()"
                     */
                    var timeout;

                    function timerHandler() {

                        var current_time = new Date().getTime();

                        var num_time_handled_times_1000 = num_time_handled * 1000;

                        var milliseconds_passed = current_time - initial_time;

                        var timeout_cap = 1000 - (milliseconds_passed - num_time_handled_times_1000);

                        timeout = setTimeout(timerHandler, timeout_cap);

                        num_time_handled++;

                        create_timer_html_classnames()
                    } 
                    
                    function create_timer_html_classnames() {

                        var timer_nums = int_to_tens(num_time_handled);

                        document.getElementById("seconds_hundreds").className = "time" + timer_nums[0];

                        document.getElementById("seconds_tens").className = "time" + timer_nums[1];

                        document.getElementById("seconds_ones").className = "time" + timer_nums[2]

                    } 
                    
                    this.start = function () {

                        num_time_handled = 0;

                        initial_time = new Date().getTime();

                        timerHandler()
                    };

                    this.stop = function () { clearTimeout(timeout) };

                    this.reset = function () {

                        num_time_handled = 0;

                        create_timer_html_classnames()
                    };

                    this.getTime = function () { return num_time_handled }
                
                } 
                
                function create_num_mines_html_classnames() {

                    var mine_counter_nums = int_to_tens(current_num_mines);

                    document.getElementById("mines_hundreds").className = "time" + mine_counter_nums[0];

                    document.getElementById("mines_tens").className = "time" + mine_counter_nums[1];

                    document.getElementById("mines_ones").className = "time" + mine_counter_nums[2]
                } 
                

                /**
                 * 
                 * @param {Any integer} integer_parameter 
                 * 
                 * Converts the provided integer into an array of the 3 numbers in the 100s, 10s, and 1s places respectively.
                 * Returns { 9, 9, 9 } if the integer is greater than 999
                 */
                function int_to_tens(integer_parameter) {

                    integer_parameter = Math.min(integer_parameter, 999);

                    if (integer_parameter >= 0) { 

                        return [Math.floor(integer_parameter / 100), Math.floor((integer_parameter % 100) / 10), integer_parameter % 10] 
                    } 
                    else { 

                        return ["-", Math.floor((-integer_parameter % 100) / 10), -integer_parameter % 10] 
                    }
                } 
                

                function you_lose(U) {

                    var row_index, collumn_index, W;

                    var X;

                    document.getElementById("face").className = "facedead";

                    counters_object_instance.stop();

                    H = true;

                    for (row_index = 1; row_index <= num_rows; row_index++) {

                            columnloop: for (collumn_index = 1; collumn_index <= num_collumns; collumn_index++) {

                                X = square_object_array_1[row_index][collumn_index];

                                if (!X.isRevealed()) {

                                    for (W = 0;  W < U.length; W++) {

                                            if (X == U[W]) {

                                                // The red mine that you blew yourself up on
                                                X.setClass("square bombdeath");

                                                continue columnloop
                                            }
                                    } 
                                    
                                    if (X.isMine() && !X.isFlagged()) { 
                                        
                                        X.setClass("square bombrevealed") 
                                    } else { 

                                        if (!X.isMine() && X.isFlagged()) { 

                                            X.setClass("square bombmisflagged") 
                                        } 
                                    }
                                }
                            }
                    }
                } 
                
                function you_win() {

                    var rows_index, collumns_index;

                    var square_object;

                    var V;

                    var counter_time;

                    var Y = false;

                    document.getElementById("face").className = "facewin";

                    counters_object_instance.stop();

                    H = true;

                    current_num_mines = 0;

                    create_num_mines_html_classnames();


                    // Flags every remaining nonflagged and nonrevealed square 
                    for (rows_index = 1; rows_index <= num_rows; rows_index++) {
                            for (collumns_index = 1; collumns_index <= num_collumns; collumns_index++) {

                                square_object = square_object_array_1[rows_index][collumns_index];

                                if (!square_object.isRevealed() && !square_object.isFlagged()) { 

                                    square_object.setClass("square bombflagged") 
                                }
                            }
                    } 
                    
                    if (game_type_id > 0) {

                        counter_time = counters_object_instance.getTime();

                        for (V = 3; V >= 0; V--) {

                            if (counter_time <= driver_array[V][game_type_id - 1]) {

                                generate_scoreboard(V + 1, true);

                                Y = true;

                                break
                            }
                        } 
                        
                        if (!Y && ((game_type_id == 1 && counter_time <= 10) || (game_type_id == 2 && counter_time <= 50) || (game_type_id == 3 && counter_time <= 150))) { 
                            
                            generate_scoreboard(1, false) 
                        } 
                        
                        if (the_game.onWin) { 

                            the_game.onWin(game_type_id, counter_time) 
                        }
                    }
                } 
                
                /**
                 * 
                 * @param {A number 1-4; selects the history-length of the scoreboard} scoreboard_history_length 
                 * @param {Boolean: did you set a new highscore?} is_new_highscore 
                 */
                function generate_scoreboard(scoreboard_history_length, is_new_highscore) {

                    var scoreboard_history_len_string;

                    var prompt_string, player_name;

                    var scoreboard_current_time = (new Date()).getTime();

                    /**
                     * The amount of time it took the player to win
                     */
                    var play_duration;

                    switch (scoreboard_history_length) {
                        case 1: scoreboard_history_len_string = "daily";

                            break;

                        case 2: scoreboard_history_len_string = "weekly";

                            break;

                        case 3: scoreboard_history_len_string = "monthly";

                            break;

                        case 4: scoreboard_history_len_string = "all-time";

                            break;

                        default: scoreboard_history_len_string = "";

                            break
                    }
                    
                    player_name = (localstorage_exists() && !!localStorage.name) ? localStorage.name : "";

                    if (is_new_highscore) { 
                        
                        prompt_string = prompt(counters_object_instance.getTime() + " is a new " + scoreboard_history_len_string + " high score! Please enter your name", player_name) 
                    } else { 

                        prompt_string = prompt("Please enter your name to submit your score (" + counters_object_instance.getTime() + ")", player_name) 
                    } 
                    
                    prompt_string = $.trim(prompt_string).substring(0, 25);

                    if (prompt_string && localstorage_exists()) { 
                        
                        localStorage.name = prompt_string 
                    } 
                    
                    play_duration = Math.round(((new Date()).getTime() - scoreboard_current_time) / 1000);

                    $.post("win.php", { 
                            key: q, 
                            name: prompt_string, 
                            time: counters_object_instance.getTime(), 
                            s: play_duration, 
                            i: scoreboard_history_length, 
                            h: is_new_highscore ? 1 : 0 
                        }, 
                        
                        function (not_used) { 
                            if (is_new_highscore && the_game.onNewHighScore) { 
                                
                                the_game.onNewHighScore(scoreboard_history_length) 
                            } 
                        })
                } 
                


                function localstorage_exists() { 
                    try { 

                        return "localStorage" in window && window.localStorage !== null 
                    } catch (U) { return false } 
                } 
                

                function is_square(object) { 

                    return object.className.substring(0, 6) == "square" 
                } 
                
                function left_or_right_click(click_event) {

                    /**
                     * An object containing two booleans: .left and .right
                     */
                    var left_and_right = {};

                    if (is_old_Internet_Explorer) {

                        left_and_right.left = click_event.button == 1 || click_event.button == 3 || click_event.button == 4;

                        left_and_right.right = click_event.button == 2 || click_event.button == 3 || click_event.button == 4
                    } 
                    
                    // If this is a normal browser
                    else {

                        // True if left or middle button was clicked
                        left_and_right.left = click_event.button == 0 || click_event.button == 1;

                        // True if right or middle button was clicked
                        left_and_right.right = click_event.button == 2 || click_event.button == 1

                        // So both happen if the middle button was clicked
                    } 
                    
                    return left_and_right
                }

                /**
                 * 
                 * @param {The square itself} square_object 
                 * @param {'X' in function c} V 
                 * @param {'W' in function c} U 
                 */
                function left_click_logic(square_object, square_class_1, square_class_2) {

                    // if the square is hidden,
                    if (!square_object.isRevealed()) {

                        // If it's marked with a question-mark
                        if (square_object.isMarked()) {

                            // Mark it with a question mark
                            // Or make it a pressed-down question-mark
                            square_object.setClass(square_class_2)
                        }


                        // If the square isn't marked with a question mark
                        else {

                            // AND the square isn't flagged
                            if (!square_object.isFlagged()) {

                                // make it blank!
                                // (or reveal it)
                                square_object.setClass(square_class_1)
                            }
                        }
                    }
                }

                // RAFA function c
                /**
                 * 
                 * @param {some id} Y 
                 * @param {e.g. "square blank"} X 
                 * @param {e.g. "square question"} W 
                 */
                function c(Y, square_class_1, square_class_2) {

                    var row_offset, collumn_offset;

                    for (row_offset = -1; row_offset <= 1; row_offset++) {

                        for (collumn_offset = -1; collumn_offset <= 1; collumn_offset++) {

                            left_click_logic(square_object_array_1[Y.getRow() + row_offset][Y.getCol() + collumn_offset], square_class_1, square_class_2)
                        }
                    }
                }

                function initialization_function() {

                    var W = false;

                    var Y;

                    function V(action) {

                        if (action.type === "touchmove" && !aa(action)) {

                            return
                        }

                        var ab = U(action);

                        if (ab != Y && !z) {

                            if (t) {

                                if (Y) {

                                    c(square_object_array_2[Y.id], "square blank", "square question")
                                }
                                if (is_square(ab)) {

                                    c(square_object_array_2[ab.id], "square open0", "square questionpressed")
                                }
                            }
                            else {

                                if (Y) {

                                    left_click_logic(square_object_array_2[Y.id], "square blank", "square question")
                                }
                                if (is_square(ab)) {
                                    left_click_logic(square_object_array_2[ab.id], "square open0", "square questionpressed")
                                }
                            }
                        }

                        Y = (is_square(ab)) ? ab : undefined
                    }


                    function Z(ac) {

                        if (ac.type === "touchmove" && !aa(ac)) { 
                            
                            return 
                        } 
                        
                        var ab = U(ac);

                        document.getElementById("face").className = (ab.id == "face") ? "facepressed" : "facesmile"
                    } 
                    
                    function U(ab) {

                        if (ab.type === "touchmove" || ab.type === "touchend") {

                            var ac = ab.originalEvent.changedTouches[0];

                            return document.elementFromPoint(ac.clientX, ac.clientY)
                        } 
                        
                        else { 

                            return ab.target 
                        }
                    } 
                    
                    function aa(action) {

                        if (!touchpoint_identifier) { 

                            return false 
                        } 
                        
                        var ac = (action.originalEvent.changedTouches[0].identifier === touchpoint_identifier);

                        return ac
                    } 
                    
                    is_old_Internet_Explorer = $.browser.msie && parseFloat($.browser.version) <= 7;

                    $(document).bind("gesturestart", function (ab) {

                        y = true;

                        X()
                    });

                    $(document).bind("gestureend", function (ab) { y = false });

                    $(document).bind("scroll", X);

                    function X() {
                        if (!touchpoint_identifier) { return } touchpoint_identifier = null;

                        if (Y) {
                            left_click_logic(square_object_array_2[Y.id], "square blank", "square question");

                            Y = undefined
                        } if (!H) { document.getElementById("face").className = "facesmile" }
                    } $(document).bind("touchstart", function (ad) {
                        $(document).unbind("mousedown").unbind("mouseup");

                        if (touchpoint_identifier || y) { return } touchpoint_identifier = ad.originalEvent.changedTouches[0].identifier;

                        if (is_square(ad.target) && !H) {
                            var ac = touchpoint_identifier;

                            var ab = ad.target;

                            setTimeout(function () {
                                if (ac === touchpoint_identifier && ab === Y) {
                                    square_object_array_2[ab.id].flag(true);

                                    touchpoint_identifier = null;

                                    document.getElementById("face").className = "facesmile"
                                }
                            }, 500);

                            $(document).bind("touchmove", V);

                            document.getElementById("face").className = "faceooh";

                            Y = undefined;

                            V(ad)
                        } else {
                            if (ad.target.id == "face") {
                                W = true;

                                $(document).bind("touchmove", V);

                                document.getElementById("face").className = "facepressed"
                            }
                        }
                    });

                    $(document).bind("touchend", function (ac) {
                        if (!aa(ac)) { return } touchpoint_identifier = null;

                        $(document).unbind("touchmove", V).unbind("touchmove", Z);

                        if (W || !H) { document.getElementById("face").className = "facesmile" } var ab = U(ac);

                        if (is_square(ab) && !H) {
                            
                            square = square_object_array_2[ab.id];

                            if (!h) { 

                                squareTypeId = fix_mines(square) 
                            } 
                            
                            if (square.isRevealed()) { 

                                square.reveal9() 
                            } 
                                
                            else {

                                if (square.isFlagged()) { 

                                    square.flag(true) 
                                } 

                                else {

                                    if (!square.reveal1()) {

                                        you_lose([square]) 
                                    } 
                                    
                                    if (!h) {

                                        T(squareTypeId);

                                        h = true
                                    }
                                }
                            } 
                            
                            ac.preventDefault()
                        } 
                        else { 
                            if (ab.id == "face" && W) { 
                                the_game.newGame() 
                            } 
                        } 
                        
                        W = false
                    });

                    $(document).mousedown(function (click_event) {

                        var click_button = left_or_right_click(click_event);

                        f = click_button.left || f;

                        t = click_button.right || t;

                        if (click_event.ctrlKey && is_square(click_event.target) && !H) {

                            square_object_array_2[click_event.target.id].flag();

                            isMouseDownForCtrlClick = true
                        } else {
                            
                            if (f) {
                                if (is_square(click_event.target) && !H) {

                                    click_event.preventDefault();

                                    $(document).bind("mousemove", V);

                                    document.getElementById("face").className = "faceooh";

                                    Y = undefined;

                                    V(click_event)
                                }

                                else {

                                    if (click_event.target.id == "face") {
                                        click_event.preventDefault();

                                        W = true;

                                        $(document).bind("mousemove", Z);

                                        document.getElementById("face").className = "facepressed"
                                    }
                                }

                            }

                            else { if (t) { if (is_square(click_event.target) && !H) { square_object_array_2[click_event.target.id].flag() } return false } }
                        }

                    });

                    $(document).on("contextmenu", function (ac) {

                        var ab = $(ac.target);

                        if (ab.is("#game") || ab.closest("#game").length > 0) { 

                            return 
                        } 
                            
                        t = false
                    });

                    $(document).mouseup(function (ae) {

                        var ab = left_or_right_click(ae);

                        var ad;

                        var ac;

                        if (isMouseDownForCtrlClick) {
                            f = false;

                            t = false;

                            isMouseDownForCtrlClick = false;

                            return
                        } 
                        
                        if (ab.left) {
                            f = false;

                            $(document).unbind("mousemove", V).unbind("mousemove", Z);

                            if (W || !H) { 
                                
                                document.getElementById("face").className = "facesmile" 
                            } 
                            
                            if (is_square(ae.target) && !H) {

                                ad = square_object_array_2[ae.target.id];

                                if (t) {
                                    z = true;

                                    c(square_object_array_2[ae.target.id], "square blank", "square question");

                                    ad.reveal9()
                                } 
                                
                                else {
                                    if (!z) {
                                        if (!h) { 
                                            ac = fix_mines(ad) 
                                        } 

                                        if (!ad.reveal1()) { 
                                            you_lose([ad]) 
                                        } 

                                        if (!h) {

                                            T(ac);

                                            h = true
                                        }
                                    } z = false
                                }
                            } else { if (ae.target.id == "face" && W) { the_game.newGame() } } W = false

                        } if (ab.right) {
                            t = false;

                            if (is_square(ae.target) && !H) {
                                if (f) {
                                    ad = square_object_array_2[ae.target.id];

                                    z = true;

                                    c(ad, "square blank", "square question");

                                    ad.reveal9()
                                } else { z = false } if (!H) { document.getElementById("face").className = "facesmile" }
                            }
                        }
                    });


                    $(document).keydown(function (ab) {

                        // Some keypress that restarts the game
                        if (ab.which == 113) { 

                            the_game.newGame() 
                        } 
                        

                        else {

                            // Some keypress that functions as a right-click
                            if (ab.which == 32) {
                                if (hoveredSquareId && !H) {
                                    square = square_object_array_2[hoveredSquareId];

                                    // Reveals 3x3 if it's a revealed square
                                    if (square.isRevealed()) { 

                                        square.reveal9() 
                                    } 

                                    // Plants a flag if its a hidden square
                                    else { 

                                        square.flag() 
                                    }
                                } 
                                
                                ab.preventDefault()
                            }
                        }
                    });

                    $("#game").mouseover(function (ab) { if (is_square(ab.target)) { hoveredSquareId = ab.target.id } });

                    $("#game").mouseout(function (ab) { if (is_square(ab.target)) { if (hoveredSquareId = ab.target.id) { hoveredSquareId = "" } } })
                }
            };

