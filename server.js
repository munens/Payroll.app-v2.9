require('dotenv').config();
var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var LocalStrategy = require('passport-local').Strategy;

// var maindb = 'mongodb://heroku_8c9x2j8n:8ctvf6rrvqbicrj8c7pjvm6qks@ds031571.mlab.com:31571/heroku_8c9x2j8n';
var maindb = process.env.MONGODB_URI;

var staffCollection = mongojs(maindb, ['staffdb']);
var payrollCollection = mongojs(maindb, ['payrolldb']);
var accountCollection = mongojs(maindb, ['accountdb']);
//var companyCollection = mongojs(maindb, ['companydb']);

var PORT = process.env.PORT || 3000;

var app = express();

app.use(bodyParser());
app.use(express.static('app'));
app.use(session({ secret : 'this is a secret' }));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(passport.initialize());
app.use(passport.session());

//app.use(multer()); //used for parsing multipart form-data.
app.use(session({ secret: ' this is a secret' }));

passport.use(new LocalStrategy(function (username, password, done){
    accountCollection.accountdb.find(function (err, users) {
        for (var i in users) {
            if (username == users[i].username 
                && password == users[i].password) {
                var user = users[i];
                return done(null, user);
            } 
        }
        return done(null, false, { message : 'unable to login' });
    });
})
);

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done){
    done(null, user);
})

app.post('/login', passport.authenticate('local'), function (request, response) {
    console.log(request.user);
    request.login(request.user, function (err) {
        if (err) {
            console.log(err);
            return next(err);
        }
        // send this user back to client.
        response.json(request.user);
    })
    /*
    if(err) {
        console.log(err)
        response.json(err);
        //return next(err);
    }
    
    response.json(request.user);
    */
});

app.post('/logout', function (request, response) {
    request.logOut();
    response.json(200);
});

app.get('/loggedin', function (request, response) {
    response.json(request.isAuthenticated() ? request.user : '0');
});

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/public/' + "index.html");
});
app.get('/login', function (request, response) {
    response.sendFile(__dirname + '/public/' + "log-in.html");
});

app.post('/staff', function (request, response) {
    var s = request.body;
    console.log(s);

    staffCollection.staffdb.insert(s, function (err, doc) {
        response.send(doc);
    });
    
});




app.get('/staff', function (request, response) {
    
    staffCollection.staffdb.find(function (err, docs) {
        response.json(docs);
    });
       
});


app.get('/staff/view/:id', function (request, response) {
    
    staffCollection.staffdb.findOne({ _id: mongojs.ObjectId(request.params.id) }, 
        function (err, docs) {
            response.json(docs);
    });
    
});

app.delete('/staff/view/:id', function (request, response) {
       
    staffCollection.staffdb.remove({ _id: mongojs.ObjectId(request.params.id) },
        function (err, doc) {
            response.json(doc);
        });
});
 

app.get('/staff/edit/:id', function (request, response) {
    
    staffCollection.staffdb.findOne({ _id: mongojs.ObjectId(request.params.id) }, 
        function (err, doc) {
            response.json(doc);
    });
});

app.put('/staff/edit/:id', function (request, response) {
    
    staffCollection.staffdb.update({ _id: mongojs.ObjectId(request.params.id)},
      {$set : { FirstName : request.body.FirstName,
                MiddleName : request.body.MiddleName,
                LastName : request.body.LastName,
                Phoneno : request.body.Phoneno,
                Email : request.body.Email,
                Address : request.body.Address,
                IDno : request.body.IDno,
                DOB : request.body.DOB,
                KRAPinno : request.body.KRAPinno,
                NHIFno : request.body.NHIFno,
                NSSFno : request.body.NSSFno,
                Role : request.body.Role,
                StaffType : request.body.StaffType,
                StaffStatus : request.body.StaffStatus,
                StartDate : request.body.StartDate,
                GrossPay : request.body.GrossPay,
                PaymentMethod : request.body.PaymentMethod,
                BankName : request.body.BankName,
                BankBranch : request.body.BankBranch,
                Accountno : request.body.Accountno,
                PAYE : request.body.PAYE,
                NHIF : request.body.NHIF,
                NSSF : request.body.NSSF,
                Bonus : request.body.Bonus,
                NetPay : request.body.NetPay,
                CompanyID : request.body.CompanyID 
        }
      },
        function (err, doc) {
            if (err) {
                console.log("Database not updated");
            } else {
                response.json(doc);
                console.log("Database updated 1");
            }
    });
});

app.get('/latestID', function (request, response) {
   
    payrollCollection.payrolldb.find().sort({ _id: -1 }, function (err, doc) {
        response.json(doc);
    
    })

});

app.get('/payroll', function (request, response) {
    
    payrollCollection.payrolldb.find(function (err, docs) {
        response.json(docs);
    });
       
});


app.post('/payrolladd', function (request, response) {
    var s = request.body;
    console.log(s);
    
    payrollCollection.payrolldb.insert(s, function (err, doc) {
        response.json(doc);
        console.log('payrolladded');
    });
    
});


app.get('/payrollreview', function (request, response) {
    
    staffCollection.staffdb.find(function (err, docs) {
        response.json(docs);
    });
});



app.get('/payroll/view/:id', function (request, response) {
    
    payrollCollection.payrolldb.findOne({ _id: mongojs.ObjectId(request.params.id) }, 
        function (err, docs) {
        response.json(docs);
    });
    
});



app.get('/payrollreview/:id', function (request, response) {
    payrollCollection.payrolldb.findOne({ _id: mongojs.ObjectId(request.params.id) }, 
        function (err, docs) {
        response.json(docs);
    });
});

app.put('/payrollreview/:id', function (request, response) {
    //console.log("5:" + request.body.PAYE);
    staffCollection.staffdb.update({ _id: mongojs.ObjectId(request.params.id) },
                      {
        $set : {
            PAYE : request.body.PAYE,
            NetPay : request.body.NetPay,
            Bonus : request.body.Bonus
        }
    },
                       function (err, doc) {
        if (err) {
            console.log("Database not updated");
        } else {
            response.json(doc);
        }
    });
});

app.put('/payrollreview2/:id', function (request, response) {
    
    console.log(request.body);

    payrollCollection.payrolldb.update({ _id: mongojs.ObjectId(request.params.id) },
                      {
        $set : {
            Payment : request.body.Payment,
            TotalPayment : request.body.TotalPayment,
                dueDate : {
                           PAYEdue : request.body.dueDate.PAYEdue,
                           NHIFdue : request.body.dueDate.NHIFdue,
                           NSSFdue : request.body.dueDate.NSSFdue
                          },
                Tax : {
                        totalPAYE : request.body.Tax.totalPAYE,
                        totalNHIF : request.body.Tax.totalNHIF,
                        totalNSSF : request.body.Tax.totalNSSF,   
                        totalTax : request.body.Tax.totalTax
                    }
        
        }
    },
                       function (err, doc) {
        if (err) {
            console.log("Database not updated");
        } else {
            response.json(doc);
        }
    })
});

app.get('/company', function (response) {
    accountCollection.accountdb.find(function (err, docs) {
        for (var i in docs) {
            var doc = docs[i];
        }
    });
});

app.delete('/payroll/view/:id', function (request, response) {
    
    payrollCollection.payrolldb.remove({ _id: mongojs.ObjectId(request.params.id) },
        function (err, doc) {
        response.json(doc);
    });
});

app.post('/login', function (request, response){
    
    var username = request.body.username;
    var password = request.body.password;

    accountCollection.accountdb.find(function (err, docs) {
        for (var i = 0; i < docs.length; i++) {
            console.log("1: " + username);
            console.log(docs[i].username);
            
             if (username === docs[i].username &&
                password === docs[i].password) {   
                console.log('yes yes');
            } else {
                console.log('user could not be found');
            }        
        }
        response.json('yes, yes');
        //for (var i in docs) {
        //    if (username === docs[i].username &&
        //        password === docs[i].password) {   
        //        response.json('yes, yes');
        //    } else {
        //        console.log('user could not be found');
        //    }
        //}

        
        
        //if (doc.username === username &&
        //    doc.password === password) {
            
        //    console.log('yes');
        //    response.json(doc);
        //}
    
    });
     
})


app.get('/accountID', function (request, response) {
    
    accountCollection.accountdb.find().sort({ _id: -1 }, function (err, doc) {
        response.json(doc);
    })
});

app.get('/appmain/:id', function (request, response) {
    
    accountCollection.accountdb.findOne({ _id: mongojs.ObjectId(request.params.id) },
        function (err, docs) {
        response.json(docs);
    });

});


app.post('/signup', function (request, response) {
    
    console.log(request.body);
    
    accountCollection.accountdb.findOne({ username : request.body.username }, function (err, user) {
        /*if (!user) {
            accountCollection.accountdb.insert(request.body, function (err, user) {
                response.json(user);
            });
        }*/
        if (user) {
            response.json(null);
            return;
        } else {
            accountCollection.accountdb.insert(request.body, function (err, user) {
                response.json(user);
            });
        }
  

        /*
        if (user) {
            response.json(null);
            return;
        } else {
            accountCollection.accountdb.insert(request.body, function (err, user) {
                request.login(user, function (err){
                    if (err) {
                        return next(err);
                    }
                    response.json(user);
                })
                
            });
        } */               
    });

    //accountCollection.accountdb.insert(request.body, function (err, doc) {
    //    response.json(doc);
    //    console.log('accountadded');
    //});

});

app.put('/addids/:id', function (request, response) {
    
    console.log(request.body.companyStaffIDs);
    
    accountCollection.accountdb.update({ _id: mongojs.ObjectId(request.params.id) },
     {
        $addToSet : { CompanyStaffIDs : request.body.companyStaffIDs,  
                      CompanyContractorIDs : request.body.companyContractorIDs,
                      CompanyPayrollIDs : request.body.PayrollID
                 }
            }

        ,
        function (err, doc) {
            if (err) {
                console.log("Database not updated");
            } else {
                response.json(doc);
            }
        });
});

app.put('/deleteid/:id', function (request, response) {
    
    console.log(request.body.StaffID);
    
    accountCollection.accountdb.findOne({ _id: mongojs.ObjectId(request.params.id) }, 
        function (err, doc) {
            console.log(doc);
        
            for (var i in doc.CompanyStaffIDs) {
                if (doc.CompanyStaffIDs[i] === request.body.StaffID) {
                
                    accountCollection.accountdb.update({ _id: mongojs.ObjectId(request.params.id) },
                        {
                        $pull : {
                            CompanyStaffIDs : request.body.StaffID
                        }
                    }, function (err, doc) {
                        if (err) {
                            console.log("Database not updated");
                        } else {
                            response.json(doc);
                        }
                    });

                }
            }

            for (var i in doc.CompanyContractorIDs) {
                if (doc.CompanyContractorIDs[i] === request.body.StaffID) {
                
                    accountCollection.accountdb.update({ _id: mongojs.ObjectId(request.params.id) },
                            {
                        $pull : {
                            CompanyContractorIDs : request.body.StaffID
                        }
                    }, function (err, doc) {
                        if (err) {
                            console.log("Database not updated");
                        } else {
                            response.json(doc);
                        }
                    });

                }
            }

            for (var i in doc.CompanyPayrollIDs) {
                if (doc.CompanyPayrollIDs[i] === request.body.PayrollID) {
                
                    accountCollection.accountdb.update({ _id: mongojs.ObjectId(request.params.id) },
                                {
                        $pull : {
                            CompanyPayrollIDs : request.body.PayrollID
                        }
                    }, function (err, doc) {
                        if (err) {
                            console.log("Database not updated");
                        } else {
                            response.json(doc);
                        }
                    });

                }
            }

    });

    
});

app.put('/onboarding/:id', function (request, response) {
    
    console.log(request.body);
    
    accountCollection.accountdb.update({ _id: mongojs.ObjectId(request.params.id) },
                      {
        $set : {
            Company : { 
                        Name : request.body.Name,
                        Branch : request.body.Branch,
                        Location : request.body.Location,
                        POBox : request.body.POBox,
                        County : request.body.County,
                        Bank : request.body.Bank,
                        Address : request.body.Address,
                        BankBranch : request.body.BankBranch,
                        Accountno : request.body.Accountno,
                        Phoneno : request.body.Phoneno,
                        Email : request.body.Email,
                        KRAPinno : request.body.KRAPinno,
                        NSSFno : request.body.NSSFno,
                        NHIFno : request.body.NHIFno
                        //CompanyStaffIDs : request.bodyStaffIDs,
                        //CompanyContractorIDs : request.bodyContractorIDs
                         
                }
        }
    },
                       function (err, doc) {
        if (err) {
            console.log("Database not updated");
        } else {
            response.json(doc);
        }
    });
    

});



app.listen(PORT, function () {
    console.log('Example app listening on port 3000!');
});
