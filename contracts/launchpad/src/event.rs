use soroban_sdk::{Address, Env, Symbol};

pub fn token_launched(e: &Env, creator: Address, token_address: Address, index: u32) {
    let topics = (Symbol::new(e, "token_launched"), creator, token_address);
    e.events().publish(topics, index);
}

pub fn fee_updated(e: &Env, admin: Address, new_fee: i128) {
    let topics = (Symbol::new(e, "fee_updated"), admin);
    e.events().publish(topics, new_fee);
}
