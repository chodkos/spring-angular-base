package pl.training.backend.model;

import pl.training.backend.security.entity.User;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import java.util.Date;
import java.util.List;

/**
 * Created by Raynor on 2017-07-26.
 */
@Entity
@Table(name = "meetings")
public class Meeting extends AbstractEntity {

    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String address;
   // private Date date;
    @Column(nullable = false)
    private String description;
   // private boolean active;
   // private User organizer;
   // List<User> invitedUsers;
   // List<User> acceptedUsers;

    public Meeting(String name, String address, String description) {
        this.name = name;
        this.address = address;
      //  this.date = date;
        this.description = description;
      /*  this.active = true;
        this.organizer = organizer;*/
      //  this.invitedUsers = invitedUsers;
      //  this.acceptedUsers = acceptedUsers;
    }

   /* public void inviteUser(User user){
        invitedUsers.add(user);
    }*/



}
