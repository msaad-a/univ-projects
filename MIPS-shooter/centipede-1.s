####################################################################
# 
# CSC258H Winter 2021 Assembly Final Project
# University of Toronto, St. George
#
# Student: Muhammad Saad Ali, 1005495439
#
# Bitmap Display Configuration:
# - Unit width in pixels: 8					     
# - Unit height in pixels: 8
# - Display width in pixels: 256
# - Display height in pixels: 256
# - Base Address for Display: 0x10008000 ($gp)
#
# Which milestone is reached in this submission?
# - Milestones 1/2/3
#
# Any additional information that the TA needs to know:
# - The game can be restarted at any time by pressing the s key
# - The game will count it as a loss if the centipede or flea hits the blaster
# - The centipede has 3 lives before it gets killed
# - The game is won whenever the centipede is dead
#####################################################################
.data
	displayAddress:	.word 0x10008000
	blasterColour1: .word 0x1EC9A3
	blasterColour2: .word 0xC95C1E
	centipedeColour: .word 0x79E26C
	centipedeHeadColour: .word 0x509048
	mushroomColour: .word 0x0900AB
	backgroundColour: .word 0x210000
	bulletColour: .word 0xFFF929
	fleaColour: .word 0xFF0000
	
	bulletLocation: .word -4:960
	mushroomLocation: .space 128
	blasterLocation: .word 4028
	centipedeLocation: .word 0, 4, 8, 12, 16, 20, 24, 28, 32, 36
	centipedeDirection: .word 4:10
	fleaLocation: .word -4
	
	centipedeLives: .word 3
.text
main:
	j initialize_mushrooms
	reset_game:
		reset_centipede:
			addi $a0, $zero, 10	 # load a0 with the loop count
			li $t0, 0
			li $t1, 4
			la $a1, centipedeLocation # load the address of the array into $a1
			la $a2, centipedeDirection # load the address of the array into $a2
		reset_c_loop:
			sw $t0, 0($a1)
			sw $t1, 0($a2)
			addi $a1, $a1, 4
			addi $a2, $a2, 4
			addi $a0, $a0, -1
			addi $t0, $t0, 4
			bne $a0, $zero, reset_c_loop
		reset_blaster:
			la $a0, blasterLocation
			li $t0 4028
			sw $t0, 0($a0)
		reset_bullet:
			addi $a0, $zero, 960
			li $t0, 0
			la $a1, bulletLocation
		reset_b_loop:
			sw $t0, 0($a1)
			addi $a1, $a1, 4
			addi $a0, $a0, -1
			addi $t0, $t0, 4
			bne $a0, $zero, reset_b_loop
		reset_flea:
			la $a0, fleaLocation
			li $t0, -4
			sw $t0, 0($a0)
					
initialize_mushrooms:
	jal get_random_number
	lw $t1, mushroomColour
	add $t2, $zero, $zero
	addi $t9, $a0, 10
	add $s0, $zero, $zero
	add $s1, $zero, $zero
	lw $t3, centipedeLives
	add $s2, $zero, $t3
	j store_mushroom

store_mushroom:
	jal get_random_spot
	addi $t3, $a0, 32
	sll $t3, $t3, 2
	sw $t3, mushroomLocation($s0)
	addi $s0, $s0, 4
	addi $t2, $t2, 1
	bne $t2, $t9, store_mushroom
	j main_game_loop

get_random_number:
  	li $v0, 42	# Service 42
  	li $a0, 0	# Choose random number between 0
  	li $a1, 22	# and 22    
  	syscall		# return random int in $a0
  	jr $ra

get_random_spot:
	li $v0, 42	# Service 42	
	li $a0, 0	# Choose random number between 0
	li $a1, 895	# and 895
	syscall		# return random int in $a0
	jr $ra

main_game_loop:
	refresh:
		j draw_background
	check_for_flea:
		jal random_number
		lw $t0, fleaLocation
		bne $t0, -4, check_keypress
		beq $a0, 0, generate_flea
		j check_keypress
	generate_flea:
		jal random_position
		addi $t0, $zero, 4
		mult $a0, $t0
		mflo $t0
		sw $t0, fleaLocation
		j check_keypress
	random_number:
		li $v0, 42
		li $a0, 0
		li $a1, 99
		syscall
		jr $ra
	random_position:
		li $v0, 42
		li $a0, 0
		li $a1, 31
		syscall
		jr $ra
	check_keypress:
		lw $t8, 0xffff0000
		beq $t8, 1, get_key
		addi $t8, $zero, 0
		j update_bullets
	get_key:
		lw $t9, 0xffff0004
		addi $v0, $zero, 0
		beq $t9, 0x6A, respond_to_j
		beq $t9, 0x6B, respond_to_k
		beq $t9, 0x78, respond_to_x
		beq $t9, 0x73, respond_to_s
		j update_bullets
	respond_to_s:
		j reset_game
	respond_to_j:
		lw $t1, blasterLocation
		beq $t1, 3972, update_bullets
		addi $t2, $t1, -4
		sw $t2, blasterLocation
		j update_bullets
	respond_to_k:
		lw $t1, blasterLocation
		beq $t1, 4088, update_bullets
		addi $t2, $t1, 4
		sw $t2, blasterLocation
		j update_bullets
	respond_to_x:
		lw $t1, blasterLocation
		addi $t1, $t1, -256
		sw $t1, bulletLocation($s1)
		addi $s1, $s1, 4
		j update_bullets
	update_bullets:
		addi $t0, $zero, 4
		div $s1, $t0
		mflo $a0	#loop count
		addi $a0, $a0, 1
		la $a1, bulletLocation
	bullet_loop:
		lw $t0, displayAddress
		lw $t1, 0($a1)
		addi $t1, $t1, -128
		blt $t1, -4, remove_bullet
		add $t2, $t1, $t0
		lw $t3, 0($t2)
		beq $t3, 0x0900AB, remove_mushroom
		beq $t3, 0x79E26C, remove_life
		beq $t3, 0x509048, remove_life
		j bullet_store
		remove_life:
			addi $s2, $s2, -1
			beq $s2, 0, kill_centipede
			li $t1, -4
			j bullet_store
		remove_bullet:
			li $t1, -4
			j bullet_store
		remove_mushroom:
			addi $t4, $zero, 4
			div $s0, $t4
			mflo $a2	#loop count
			la $a3, mushroomLocation
		remove_mush_loop:
			lw $t5, 0($a3)
			beq $t1, $t5, destroy
			j update_loop
			destroy:
				li $t5, -4
				sw $t5, 0($a3)
				li $t1, -4
				j bullet_store
			update_loop:
				addi $a3, $a3, 4	 
				addi $a2, $a2, -1	 
				bne $a0, $zero, remove_mush_loop
		bullet_store:
			sw $t1, 0($a1)
			addi $a1, $a1, 4
			addi $a0, $a0, -1
			bne $a0, $zero, bullet_loop
			j update_centipede
	update_centipede:
		addi $a0, $zero, 10
		la $a1, centipedeLocation
		la $a2, centipedeDirection
	centipede_loop:
		lw $t1, 0($a1)
		lw $t2, 0($a2)

		sub $t4, $t1, 124
		li $t5, 128
		div $t1, $t5
		mfhi $t6
		div $t4, $t5
		mfhi $t7
		add $t3, $t1, $t2
		
		bge $t1, 3712, side_to_side
		
		beq $t6, 0, check_direction_left
		beq $t7, 0, check_direction_right
		
		lw $t0, displayAddress
		add $t8, $t3, $t0
		lw $t9, 0($t8)
		beq $t9, 0x0900AB, avoid_mushroom
		j update
		check_direction_left:
			beq $t2, -4, move_down_left
			j update
		check_direction_right:
			beq $t2, 4, move_down_right
			j update
		move_down_left:
			sub $t3, $t1, $t2
			add $t3, $t1, 128
			addi $t2, $t2, 8
			j update
		move_down_right:
			sub $t3, $t1, $t2
			add $t3, $t1, 128
			addi $t2, $t2, -8
		update:
			sw $t3, 0($a1)
			sw $t2, 0($a2)
			addi $a1, $a1, 4
			addi $a2, $a2, 4
			addi $a0, $a0, -1
			bne $a0, $zero, centipede_loop
			j restart
		side_to_side:
			beq $t1, 3712, check_left
			beq $t1, 3836, check_right
			j end
			check_left:
				beq $t2, -4, switch_right
				j end
			check_right:
				beq $t2, 4, switch_left
				j end
			switch_right:
				addi $t2, $t2, 8
				add $t3, $t3, $t2
				j end
			switch_left:
				addi $t2, $t2, -8
				add $t3, $t3, $t2
			end:
				j update
		avoid_mushroom:
			beq $t2, -4, down_right
			beq $t2, 4, down_left
			down_right:
				sub $t3, $t1, $t2
				add $t3, $t1, 128
				addi $t2, $t2, 8
				j update
			down_left:
				sub $t3, $t1, $t2
				add $t3, $t1, 128
				addi $t2, $t2, -8
			j update
	restart:
		li $v0, 32				
		li $a0, 50				
		syscall
	
		j main_game_loop
	
draw_background:
	lw $t0, displayAddress		# Location of current pixel data
	addi $t1, $t0, 4096			# Location of last pixel data. Hard-coded below.
								          # 32x32 = 1024 pixels x 4 bytes = 4096.
	lw $t2, backgroundColour			# Colour of the background
	
draw_bg_loop:
	sw $t2, 0($t0)				# Store the colour
	addi $t0, $t0, 4			# Next pixel
	blt $t0, $t1, draw_bg_loop

draw_mushroom:	
	addi $t0, $zero, 4
	div $s0, $t0
	mflo $a0	#loop count
	la $a1, mushroomLocation

mush_loop:
	lw $t1, 0($a1)		 
	
	lw $t2, displayAddress  # $t2 stores the base address for display
	lw $t3, mushroomColour	# $t3 stores the mushroom colour code
	
	add $t4, $t1, $zero	
	add $t4, $t2, $t4	
	sw $t3, 0($t4)		
	
	addi $a1, $a1, 4	 
	addi $a0, $a0, -1	 
	bne $a0, $zero, mush_loop
	
	

	
draw_blaster:
	lw $t0, displayAddress		# t0 stores the base address for display
	lw $t1, blasterColour1		# t1 stores the primary blaster colour
	lw $t2, blasterColour2		# t2 stores the secondary blaster colour
	lw $t3, blasterLocation		# t3 stores the blaster location
	
	addi $t4, $t3, -4		# store pixel location at blasterLocation - 4 in t4
	add $t4, $t0, $t4		# add pixel location at t4 to the display address and store it in t4
	sw $t1, 0($t4)			# colour pixel in t4 the primary blaster colour
	addi $t4, $t4, 8		
	sw $t1, 0($t4)			
	addi $t4, $t4, -128		
	sw $t2, 0($t4)			
	addi $t4, $t4, -4		
	sw $t1, 0($t4)			
	addi $t4, $t4, -4		
	sw $t2, 0($t4)			
	addi $t4, $t4, -124		
	sw $t1, 0($t4)			

draw_bullet:
	addi $t0, $zero, 4
	div $s1, $t0
	mflo $a0	#loop count
	addi $a0, $a0, 1
	la $a1, bulletLocation

bullet_loop2:
	lw $t1, 0($a1)		 
	lw $t2, displayAddress  
	lw $t3, bulletColour	
	
	add $t4, $t1, $zero
	blt $t4, -4, reset_bullet2
	j color_bullet
	reset_bullet2:
		li $t4, -4
	color_bullet:
		add $t4, $t2, $t4	
		sw $t3, 0($t4)		
	
		addi $a1, $a1, 4	 
		addi $a0, $a0, -1	 
		bne $a0, $zero, bullet_loop2

draw_flea:
	lw $t0, fleaLocation
	lw $t1, fleaColour
	lw $t2, displayAddress
	beq $t0, -4, draw_centipede
	addi $t3, $t0, 128
	sw $t3, fleaLocation
	bgt $t3, 4088, remove_flea
	j color_flea
	remove_flea:
		li $t4, -4
		sw $t4, fleaLocation
	color_flea:
		add $t5, $t2, $t3
		lw $t8, 0($t5)
		beq $t8, 0x1EC9A3, lose_screen
		beq $t8, 0xC95C1E, lose_screen
		sw $t1, 0($t5)
	
draw_centipede:
	addi $a0, $zero, 10	 # load a0 with the loop count
	la $a1, centipedeLocation # load the address of the array into $a1
	la $a2, centipedeDirection # load the address of the array into $a2

arr_loop:	#iterate over the loops elements to draw each body in the centipede
	lw $t1, 0($a1)		 # load a word from the centipedeLocation array into $t1
	# lw $t5, 0($a2)		 # load a word from the centipedeDirection  array into $t5
	
	lw $t2, displayAddress  # $t2 stores the base address for display
	lw $t3, centipedeColour	# $t3 stores the centipede colour code
	lw $t6, centipedeHeadColour
	
	add $t4, $t1, $zero	
	add $t4, $t2, $t4	
	beq $a0, 1, color_head
	sw $t3, 0($t4)		
	
	addi $a1, $a1, 4	 
	addi $a0, $a0, -1	
	j arr_loop

color_head:
	lw $t5, 0($t4)
	beq $t5, 0x1EC9A3, lose_screen
	sw $t6, 0($t4)
	j check_for_flea

kill_centipede:
	addi $a0, $zero, 10	 # load a0 with the loop count
	la $a1, centipedeLocation
kill_loop:
	lw $t0, displayAddress
	lw $t2, 0($a1)
	lw $t3, backgroundColour
	
	add $t4, $t0, $t2
	sw $t3, 0($t4)
	addi $a1, $a1, 4
	addi $a0, $a0, -1
	bne $a0, $zero, kill_loop
win_screen:
	draw_win_background:
		lw $t0, displayAddress		
		addi $t1, $t0, 4096			
								          
		li $t2, 0x000000			
	
	draw_wbg_loop:
		sw $t2, 0($t0)				
		addi $t0, $t0, 4			
		blt $t0, $t1, draw_wbg_loop
	
	you_win:
		lw $t0, displayAddress	
		li $t3, 0xff0000
		
		# Y
		sw $t3, 1032($t0)
		sw $t3, 1164($t0)
		sw $t3, 1296($t0)
		sw $t3, 1428($t0)
		sw $t3, 1556($t0)
		sw $t3, 1684($t0)
		sw $t3, 1812($t0)
		sw $t3, 1940($t0)
		sw $t3, 1304($t0)
		sw $t3, 1180($t0)
		sw $t3, 1056($t0)
		
		# O
		sw $t3, 1068($t0)
		sw $t3, 1072($t0)
		sw $t3, 1076($t0)
		sw $t3, 1080($t0)
		sw $t3, 1084($t0)
		sw $t3, 1088($t0)
		sw $t3, 1092($t0)
		sw $t3, 1220($t0)
		sw $t3, 1348($t0)
		sw $t3, 1476($t0)
		sw $t3, 1604($t0)
		sw $t3, 1732($t0)
		sw $t3, 1860($t0)
		sw $t3, 1988($t0)
		sw $t3, 1984($t0)
		sw $t3, 1980($t0)
		sw $t3, 1976($t0)
		sw $t3, 1972($t0)
		sw $t3, 1968($t0)
		sw $t3, 1964($t0)
		sw $t3, 1836($t0)
		sw $t3, 1708($t0)
		sw $t3, 1580($t0)
		sw $t3, 1452($t0)
		sw $t3, 1324($t0)
		sw $t3, 1196($t0)
		
		# U
		sw $t3, 1104($t0)
		sw $t3, 1232($t0)
		sw $t3, 1360($t0)
		sw $t3, 1488($t0)
		sw $t3, 1616($t0)
		sw $t3, 1744($t0)
		sw $t3, 1872($t0)
		sw $t3, 2000($t0)
		sw $t3, 2004($t0)
		sw $t3, 2008($t0)
		sw $t3, 2012($t0)
		sw $t3, 2016($t0)
		sw $t3, 2020($t0)
		sw $t3, 2024($t0)
		sw $t3, 1896($t0)
		sw $t3, 1768($t0)
		sw $t3, 1640($t0)
		sw $t3, 1512($t0)
		sw $t3, 1384($t0)
		sw $t3, 1256($t0)
		sw $t3, 1128($t0)
		
		# W
		sw $t3, 2440($t0)
		sw $t3, 2568($t0)
		sw $t3, 2700($t0)
		sw $t3, 2828($t0)
		sw $t3, 2956($t0)
		sw $t3, 3088($t0)
		sw $t3, 3216($t0)
		sw $t3, 3344($t0)
		sw $t3, 2964($t0)
		sw $t3, 2836($t0)
		sw $t3, 3096($t0)
		sw $t3, 3224($t0)
		sw $t3, 3352($t0)
		sw $t3, 2972($t0)
		sw $t3, 2844($t0)
		sw $t3, 2716($t0)
		sw $t3, 2592($t0)
		sw $t3, 2464($t0)
		
		# I
		sw $t3, 2476($t0)
		sw $t3, 2480($t0)
		sw $t3, 2484($t0)
		sw $t3, 2488($t0)
		sw $t3, 2492($t0)
		sw $t3, 2496($t0)
		sw $t3, 2500($t0)
		sw $t3, 2616($t0)
		sw $t3, 2744($t0)
		sw $t3, 2872($t0)
		sw $t3, 3000($t0)
		sw $t3, 3128($t0)
		sw $t3, 3256($t0)
		sw $t3, 3384($t0)
		sw $t3, 3388($t0)
		sw $t3, 3392($t0)
		sw $t3, 3396($t0)
		sw $t3, 3380($t0)
		sw $t3, 3376($t0)
		sw $t3, 3372($t0)
		
		# N
		sw $t3, 2512($t0)
		sw $t3, 2640($t0)
		sw $t3, 2768($t0)
		sw $t3, 2896($t0)
		sw $t3, 3024($t0)
		sw $t3, 3152($t0)
		sw $t3, 3280($t0)
		sw $t3, 3408($t0)
		sw $t3, 2644($t0)
		sw $t3, 2776($t0)
		sw $t3, 2908($t0)
		sw $t3, 3040($t0)
		sw $t3, 3172($t0)
		sw $t3, 3304($t0)
		sw $t3, 3432($t0)
		sw $t3, 3304($t0)
		sw $t3, 3176($t0)
		sw $t3, 3048($t0)
		sw $t3, 2920($t0)
		sw $t3, 2792($t0)
		sw $t3, 2664($t0)
		sw $t3, 2536($t0)
		
		# !
		sw $t3, 2548($t0)
		sw $t3, 2676($t0)
		sw $t3, 2804($t0)
		sw $t3, 2932($t0)
		sw $t3, 3060($t0)
		sw $t3, 3188($t0)
		sw $t3, 3444($t0)
		j check_retry

lose_screen:
	draw_lose_background:
		lw $t0, displayAddress		
		addi $t1, $t0, 4096			
							
		li $t2, 0x000000			
	
	draw_lbg_loop:
		sw $t2, 0($t0)				
		addi $t0, $t0, 4			
		blt $t0, $t1, draw_lbg_loop
		
	you_lose:
		lw $t0, displayAddress	
		li $t3, 0xff0000
		
		# Y
		sw $t3, 1032($t0)
		sw $t3, 1164($t0)
		sw $t3, 1296($t0)
		sw $t3, 1428($t0)
		sw $t3, 1556($t0)
		sw $t3, 1684($t0)
		sw $t3, 1812($t0)
		sw $t3, 1940($t0)
		sw $t3, 1304($t0)
		sw $t3, 1180($t0)
		sw $t3, 1056($t0)
		
		# O
		sw $t3, 1068($t0)
		sw $t3, 1072($t0)
		sw $t3, 1076($t0)
		sw $t3, 1080($t0)
		sw $t3, 1084($t0)
		sw $t3, 1088($t0)
		sw $t3, 1092($t0)
		sw $t3, 1220($t0)
		sw $t3, 1348($t0)
		sw $t3, 1476($t0)
		sw $t3, 1604($t0)
		sw $t3, 1732($t0)
		sw $t3, 1860($t0)
		sw $t3, 1988($t0)
		sw $t3, 1984($t0)
		sw $t3, 1980($t0)
		sw $t3, 1976($t0)
		sw $t3, 1972($t0)
		sw $t3, 1968($t0)
		sw $t3, 1964($t0)
		sw $t3, 1836($t0)
		sw $t3, 1708($t0)
		sw $t3, 1580($t0)
		sw $t3, 1452($t0)
		sw $t3, 1324($t0)
		sw $t3, 1196($t0)
		
		# U
		sw $t3, 1104($t0)
		sw $t3, 1232($t0)
		sw $t3, 1360($t0)
		sw $t3, 1488($t0)
		sw $t3, 1616($t0)
		sw $t3, 1744($t0)
		sw $t3, 1872($t0)
		sw $t3, 2000($t0)
		sw $t3, 2004($t0)
		sw $t3, 2008($t0)
		sw $t3, 2012($t0)
		sw $t3, 2016($t0)
		sw $t3, 2020($t0)
		sw $t3, 2024($t0)
		sw $t3, 1896($t0)
		sw $t3, 1768($t0)
		sw $t3, 1640($t0)
		sw $t3, 1512($t0)
		sw $t3, 1384($t0)
		sw $t3, 1256($t0)
		sw $t3, 1128($t0)
		
		# L
		sw $t3, 2440($t0)
		sw $t3, 2568($t0)
		sw $t3, 2696($t0)
		sw $t3, 2824($t0)
		sw $t3, 2952($t0)
		sw $t3, 3080($t0)
		sw $t3, 3208($t0)
		sw $t3, 3212($t0)
		sw $t3, 3216($t0)
		sw $t3, 3220($t0)
		sw $t3, 3224($t0)
		
		# O
		sw $t3 3236($t0)
		sw $t3 3108($t0)
		sw $t3 2980($t0)
		sw $t3 2852($t0)
		sw $t3 2724($t0)
		sw $t3 2596($t0)
		sw $t3 2468($t0)
		sw $t3 2472($t0)
		sw $t3 2476($t0)
		sw $t3 2480($t0)
		sw $t3 2484($t0)
		sw $t3 2612($t0)
		sw $t3 2740($t0)
		sw $t3 2868($t0)
		sw $t3 2996($t0)
		sw $t3 3124($t0)
		sw $t3 3252($t0)
		sw $t3 3248($t0)
		sw $t3 3244($t0)
		sw $t3 3240($t0)
		
		# S
		sw $t3 3264($t0)
		sw $t3 3268($t0)
		sw $t3 3272($t0)
		sw $t3 3276($t0)
		sw $t3 3280($t0)
		sw $t3 3152($t0)
		sw $t3 3024($t0)
		sw $t3 2896($t0)
		sw $t3 2892($t0)
		sw $t3 2888($t0)
		sw $t3 2884($t0)
		sw $t3 2880($t0)
		sw $t3 2752($t0)
		sw $t3 2624($t0)
		sw $t3 2496($t0)
		sw $t3 2500($t0)
		sw $t3 2504($t0)
		sw $t3 2508($t0)
		sw $t3 2512($t0)
		
		# E
		sw $t3 2524($t0)
		sw $t3 2528($t0)
		sw $t3 2532($t0)
		sw $t3 2536($t0)
		sw $t3 2540($t0)
		sw $t3 2652($t0)
		sw $t3 2780($t0)
		sw $t3 2908($t0)
		sw $t3 2912($t0)
		sw $t3 2916($t0)
		sw $t3 2920($t0)
		sw $t3 2924($t0)
		sw $t3 3036($t0)
		sw $t3 3164($t0)
		sw $t3 3292($t0)
		sw $t3 3296($t0)
		sw $t3 3300($t0)
		sw $t3 3304($t0)
		sw $t3 3308($t0)
		
check_retry:
	lw $t8, 0xffff0000
	beq $t8, 1, get_key2
	addi $t8, $zero, 0
	j check_retry
get_key2:
	lw $t9, 0xffff0004
	beq $t9, 0x73, respond_to_retry
	j check_retry
respond_to_retry:
	j reset_game
Exit:
	li $v0, 10
	syscall	
