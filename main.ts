enum SpriteKindLegacy {
    Player,
    Projectile,
    Food,
    Enemy,
    snake_body_sprite,
    snake_head_sprite
}
/**
 * Game over if snakes turns back on its own body
 */
function move_right () {
    move_last_body_sprite_to_where_head_was()
    snake_head.setPosition(head_X_prior + ss, head_Y_prior)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    move_up()
})
function dump () {
    game.splash("last " + body_last_sprite.x + "  " + body_last_sprite.y)
    game.splash("next " + body_next_to_last_sprite.x + "  " + body_next_to_last_sprite.y)
    game.splash("dx =   " + dx)
    game.splash("dy =   " + dy)
}
controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    move_up()
})
function make_body_sprite (x: number, y: number) {
    body_sprite = sprites.create(snake_body_image, SpriteKindLegacy.snake_body_sprite)
    body_sprite.setPosition(x, y)
    snake_body_list.push(body_sprite)
}
function move_last_body_sprite_to_where_head_was () {
    head_X_prior = snake_head.x
    head_Y_prior = snake_head.y
    snake_body_list.insertAt(0, snake_body_list.pop())
    snake_body_list[0].setPosition(snake_head.x, snake_head.y)
}
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    move_right()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    move_left()
})
function create_snake_body () {
    snake_body_image = image.create(ss, ss)
    snake_body_image.fill(15)
    snake_body_list = sprites.allOfKind(SpriteKindLegacy.snake_body_sprite)
    for (let index = 0; index <= 4; index++) {
        make_body_sprite(snake_head.x, snake_head.y + (index + 1) * ss)
    }
}
function lengthen_snake_by_one_sprite () {
    body_last_sprite = snake_body_list[snake_body_list.length - 1]
    body_next_to_last_sprite = snake_body_list[snake_body_list.length - 2]
    dx = body_next_to_last_sprite.x - body_last_sprite.x
    dy = body_next_to_last_sprite.y - body_last_sprite.y
    X = body_last_sprite.x + dx
    Y = body_last_sprite.y + dy
    make_body_sprite(X, Y)
}
function move_left () {
    move_last_body_sprite_to_where_head_was()
    snake_head.setPosition(head_X_prior - ss, head_Y_prior)
}
/**
 * Keys - up, down, left, right
 */
/**
 * Score when snake eats apple. Lengthen snake body
 */
// Used for debugging above function
sprites.onOverlap(SpriteKindLegacy.snake_head_sprite, SpriteKindLegacy.snake_body_sprite, function (sprite, otherSprite) {
    game.over(false, effects.dissolve)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    move_right()
})
function move_down () {
    move_last_body_sprite_to_where_head_was()
    snake_head.setPosition(head_X_prior, head_Y_prior + ss)
}
controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    move_down()
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    move_down()
})
sprites.onOverlap(SpriteKindLegacy.snake_head_sprite, SpriteKindLegacy.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy(effects.spray, 500)
    n_apples += -1
    lengthen_snake_by_one_sprite()
    create_random_apples()
})
function create_snake_head () {
    snake_head_image = image.create(ss, ss)
    snake_head_image.fill(7)
    snake_head = sprites.create(snake_head_image, SpriteKindLegacy.snake_head_sprite)
    snake_head.setFlag(SpriteFlag.StayInScreen, true)
}
function create_random_apples () {
    for (let index = 0; index < randint(1, 2); index++) {
        if (n_apples < 3) {
            apple_sprite = sprites.create(apple_image, SpriteKindLegacy.Food)
            X = randint(8, 160 - 8)
            Y = randint(8, 120 - 8)
            apple_sprite.setPosition(X, Y)
            n_apples += 1
        }
    }
}
function move_up () {
    move_last_body_sprite_to_where_head_was()
    snake_head.setPosition(head_X_prior, head_Y_prior - ss)
}
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    move_left()
})
let apple_sprite: Sprite = null
let snake_head_image: Image = null
let Y = 0
let X = 0
let snake_body_list: Sprite[] = []
let snake_body_image: Image = null
let body_sprite: Sprite = null
let dy = 0
let dx = 0
let body_next_to_last_sprite: Sprite = null
let body_last_sprite: Sprite = null
let head_Y_prior = 0
let head_X_prior = 0
let snake_head: Sprite = null
let n_apples = 0
let apple_image: Image = null
let ss = 0
scene.setBackgroundColor(6)
ss = 8
create_snake_head()
create_snake_body()
apple_image = img`
    . . . . . . . e c 7 . . . . . . 
    . . . . e e e c 7 7 e e . . . . 
    . . c e e e e c 7 e 2 2 e e . . 
    . c e e e e e c 6 e e 2 2 2 e . 
    . c e e e 2 e c c 2 4 5 4 2 e . 
    c e e e 2 2 2 2 2 2 4 5 5 2 2 e 
    c e e 2 2 2 2 2 2 2 2 4 4 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 4 2 e 
    . e e e 2 2 2 2 2 2 2 2 2 4 e . 
    . 2 e e 2 2 2 2 2 2 2 2 4 2 e . 
    . . 2 e e 2 2 2 2 2 4 4 2 e . . 
    . . . 2 2 e e 4 4 4 2 e e . . . 
    . . . . . 2 2 e e e e . . . . . 
    `
n_apples = 0
create_random_apples()
info.setScore(0)
